from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import JsonResponse, HttpResponse
from .mongo_connect import resume_collection, user_cv_data_collection
import json
from datetime import datetime
import uuid
from pymongo import DESCENDING
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import csrf_exempt


def test_mongo_connection(request):
    resume_collection.insert_one({"test": "MongoDB is working!"})
    return JsonResponse({"status": "MongoDB Connected & Data Inserted"})


def save_resume(request, cv_id=None):
    if request.method == "POST":

        if request.content_type == "application/x-www-form-urlencoded":
            content = request.POST.get("document-content", "").strip()
            cv_date = request.POST.get("cv_date", "").strip()

            print(f"Received content: {content}")

            if not cv_id:
                cv_id = str(uuid.uuid4())

            if not cv_date:
                cv_date = datetime.now().strftime("%Y-%m-%d")

            resume_collection.update_one(
                {"cv_id": cv_id},
                {
                    "$set": {
                        "resume_content": content,
                        "cv_date": cv_date,
                    }
                },
                upsert=True,
            )

            return JsonResponse(
                {"success": True, "message": "Resume saved successfully"}
            )

        elif request.content_type == "application/json":
            try:
                data = json.loads(request.body)
                content = data.get("content", "").strip()
                cv_date = data.get("cv_date", "").strip()

                print(f"Received content: {content}")

                if not cv_id:
                    cv_id = str(uuid.uuid4())

                if not cv_date:
                    cv_date = datetime.now().strftime("%Y-%m-%d")

                resume_collection.update_one(
                    {"cv_id": cv_id},
                    {
                        "$set": {
                            "resume_content": content,
                            "cv_date": cv_date,
                        }
                    },
                    upsert=True,
                )

                return JsonResponse(
                    {"success": True, "message": "Resume saved successfully"}
                )

            except Exception as e:
                return JsonResponse({"success": False, "message": str(e)})

        else:
            return JsonResponse(
                {"success": False, "message": "Content-Type is not supported"}
            )

    elif request.method == "GET":
        if cv_id:
            resume_data = resume_collection.find_one({"cv_id": cv_id})
            if resume_data:

                return render(request, "index.html", {"resume_data": resume_data})
            else:
                return JsonResponse({"success": False, "message": "Resume not found"})
        else:

            return render(request, "index.html", {"resume_data": None})

    return JsonResponse({"success": False, "message": "Method not allowed"})


def list_resumes(request):
    if request.method == "GET":
        try:

            resumes = list(
                resume_collection.find({}, {"_id": 0}).sort("cv_date", DESCENDING)
            )

            paginator = Paginator(resumes, 5)
            page_number = request.GET.get("page") or 1
            try:
                page_obj = paginator.page(page_number)
            except PageNotAnInteger:
                page_obj = paginator.page(1)
            except EmptyPage:
                page_obj = paginator.page(paginator.num_pages)

            context = {"page_obj": page_obj}
            return render(request, "history.html", context)

        except Exception as e:

            return render(
                request, "history.html", {"error": f"Error fetching resumes: {str(e)}"}
            )


@csrf_exempt
def delete_resume(request, cv_id):
    try:

        result = resume_collection.delete_one({"cv_id": cv_id})

        if result.deleted_count > 0:
            return JsonResponse(
                {"success": True, "message": "Resume deleted successfully"}
            )
        else:
            return JsonResponse({"success": False, "message": "Resume not found"})

    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)})


@csrf_exempt
def detail_resume(request, cv_id):
    try:

        resume = resume_collection.find_one({"cv_id": cv_id}, {"_id": 0})

        if resume:
            return JsonResponse(
                {
                    "success": True,
                    "message": "Resume fetched successfully",
                    "content": resume.get("resume_content", ""),
                }
            )
        else:
            return JsonResponse({"success": False, "message": "Resume not found"})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)})


def view_resume(request, resume_id):

    resume = resume_collection.find_one({"_id": resume_id})

    if resume:
        return render(
            request, "resume_detail.html", {"resume": resume["resume_content"]}
        )
    else:
        return render(request, "resume_detail.html", {"error": "Resume not found"})


def recent_activity_view(request):
    try:

        recent_activities = list(
            resume_collection.find({}, {"_id": 0, "cv_id": 1, "cv_date": 1}).sort(
                "cv_date", DESCENDING
            )
        )

        paginator = Paginator(recent_activities, 5)
        page_number = request.GET.get("page")
        page_obj = paginator.get_page(page_number)

        return render(request, "recent.html", {"page_obj": page_obj})

    except Exception as e:
        return render(request, "recent.html", {"error": str(e)})


def test_data(request):

    dummy_data = {
        "name": "John Doe",
        "resume_content": "<p>This is a test resume content.</p>",
    }

    result = resume_collection.insert_one(dummy_data)

    if result.acknowledged:
        return JsonResponse(
            {"success": True, "message": "Dummy data inserted successfully!"}
        )
    else:
        return JsonResponse(
            {"success": False, "message": "Failed to insert dummy data"}
        )


def resume_form(request):
    return render(request, "resume-form.html")


@csrf_exempt
def submit_resume(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("Received data:", data)

            result = user_cv_data_collection.insert_one(data)

            return JsonResponse(
                {
                    "success": True,
                    "message": "Resume saved",
                    "redirect_url": reverse(
                        "save_resume"
                    ),  # Make sure save_resume is named in urls.py
                }
            )

        except Exception as e:
            print("Error inserting to MongoDB:", e)
            return JsonResponse({"success": False, "message": str(e)})
    else:
        return JsonResponse(
            {"success": False, "message": "Method not allowed"}, status=405
        )


def get_resume_data(request):

    if request.method == "GET" and not request.META.get("HTTP_REFERER"):
        return redirect("save_resume")

    resume_data = user_cv_data_collection.find_one(sort=[("_id", -1)])

    if resume_data:
        resume_data["_id"] = str(resume_data["_id"])

        template_number = int(request.GET.get("template", 1))

        if template_number == 1:
            template = "resume_design/creative-1-16.html"
        elif template_number == 2:
            template = "resume_design/basic-1-1.html"
        elif template_number == 3:
            template = "resume_design/professional-14-16.html"
        elif template_number == 4:
            template = "resume_design/creative-4-16.html"
        else:
            template = "resume_design/creative-1-16.html"

        return render(
            request,
            template,
            {
                "fullName": resume_data.get("fullName", ""),
                "jobTitle": resume_data.get("jobTitle", ""),
                "email": resume_data.get("email", ""),
                "phone": resume_data.get("phone", ""),
                "location": resume_data.get("location", ""),
                "linkedin": resume_data.get("linkedin", ""),
                "github": resume_data.get("github", ""),
                "stackoverflow": resume_data.get("stackoverflow", ""),
                "experience": zip(
                    resume_data.get("companyName[]", []),
                    resume_data.get("jobTitle[]", []),
                    resume_data.get("startDate[]", []),
                    resume_data.get("endDate[]", []),
                    resume_data.get("jobDescription[]", []),
                ),
                "education": zip(
                    resume_data.get("degree[]", []),
                    resume_data.get("institution[]", []),
                    resume_data.get("eduStartDate[]", []),
                    resume_data.get("eduEndDate[]", []),
                    resume_data.get("eduDescription[]", []),
                ),
                "certifications": resume_data.get("certifications[]", "").split(","),
                "skills": resume_data.get("skills", "").split(","),
                "summary": resume_data.get("summary", ""),
            },
        )

    return JsonResponse({"error": "No data found"}, status=404)
