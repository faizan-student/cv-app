from django.shortcuts import render
from django.http import JsonResponse
from .mongo_connect import resume_collection
import json
from datetime import datetime
import uuid
from pymongo import DESCENDING
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.views.decorators.csrf import csrf_exempt


def test_mongo_connection(request):
    resume_collection.insert_one({"test": "MongoDB is working!"})
    return JsonResponse({"status": "MongoDB Connected & Data Inserted"})


# def save_resume(request):
#     if request.method == "POST":
#         # Agar content form ke through aa raha hai
#         if request.content_type == "application/x-www-form-urlencoded":
#             # Get content and cv_date from POST request
#             content = request.POST.get("document-content", "").strip()
#             cv_date = request.POST.get("cv_date", "").strip()

#             print(f"Received content: {content}")  # Debugging: Content ko print karna

#             # Generate unique CV ID using UUID
#             cv_id = str(uuid.uuid4())  # This will generate a unique CV ID

#             if not cv_date:  # If no date is provided, use the current date
#                 cv_date = datetime.now().strftime("%Y-%m-%d")  # Format: YYYY-MM-DD

#             # MongoDB mein save karna
#             resume_collection.insert_one(
#                 {
#                     "cv_id": cv_id,  # Unique CV ID
#                     "resume_content": content,  # Resume content (HTML)
#                     "cv_date": cv_date,  # Current date or provided date
#                 }
#             )

#             return JsonResponse(
#                 {"success": True, "message": "Resume saved successfully"}
#             )

#         # Agar content JSON format mein aa raha ho
#         elif request.content_type == "application/json":
#             try:
#                 data = json.loads(request.body)
#                 content = data.get(
#                     "content", ""
#                 ).strip()  # Rich text editor ka HTML content
#                 cv_date = data.get("cv_date", "").strip()

#                 print(
#                     f"Received content: {content}"
#                 )  # Debugging: Content ko print karna

#                 # Generate unique CV ID using UUID
#                 cv_id = str(uuid.uuid4())  # This will generate a unique CV ID

#                 if not cv_date:  # If no date is provided, use the current date
#                     cv_date = datetime.now().strftime("%Y-%m-%d")  # Format: YYYY-MM-DD

#                 # MongoDB mein save karna
#                 resume_collection.insert_one(
#                     {
#                         "cv_id": cv_id,  # Unique CV ID
#                         "resume_content": content,  # Resume content (HTML)
#                         "cv_date": cv_date,  # Current date or provided date
#                     }
#                 )

#                 return JsonResponse(
#                     {"success": True, "message": "Resume saved successfully"}
#                 )

#             except Exception as e:
#                 return JsonResponse({"success": False, "message": str(e)})

#         else:
#             return JsonResponse(
#                 {"success": False, "message": "Content-Type is not supported"}
#             )

#     else:
#         return render(request, "index.html")


def save_resume(request, cv_id=None):
    if request.method == "POST":
        # If content is coming from a form (application/x-www-form-urlencoded)
        if request.content_type == "application/x-www-form-urlencoded":
            content = request.POST.get("document-content", "").strip()
            cv_date = request.POST.get("cv_date", "").strip()

            print(f"Received content: {content}")  # Debugging: Print content

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

                print(f"Received content: {content}")  # Debugging: Print content

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
                # Rendering resume data to the template
                return render(request, "index.html", {"resume_data": resume_data})
            else:
                return JsonResponse({"success": False, "message": "Resume not found"})
        else:
            # If no cv_id is provided, render the index page with no data
            return render(request, "index.html", {"resume_data": None})

    # Default response (in case of unsupported method)
    return JsonResponse({"success": False, "message": "Method not allowed"})


def list_resumes(request):
    if request.method == "GET":
        try:
            # MongoDB se resume data fetch kar rahe hain
            resumes = list(
                resume_collection.find({}, {"_id": 0}).sort("cv_date", DESCENDING)
            )

            # Pagination
            paginator = Paginator(resumes, 5)  # 5 items per page
            page_number = request.GET.get("page") or 1  # Default page 1
            try:
                page_obj = paginator.page(page_number)
            except PageNotAnInteger:
                page_obj = paginator.page(1)
            except EmptyPage:
                page_obj = paginator.page(paginator.num_pages)

            # Template me data bhejna
            context = {"page_obj": page_obj}
            return render(request, "history.html", context)

        except Exception as e:
            # Agar koi error aaye to error message ke sath render
            return render(
                request, "history.html", {"error": f"Error fetching resumes: {str(e)}"}
            )


@csrf_exempt
def delete_resume(request, cv_id):
    try:
        # Resume ko MongoDB se delete kar rahe hain
        result = resume_collection.delete_one({"cv_id": cv_id})

        # Agar result matched hai to successful delete message bhejna
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
        # Fetch resume from MongoDB based on cv_id
        resume = resume_collection.find_one({"cv_id": cv_id}, {"_id": 0})

        # If resume is found, send the content
        if resume:
            return JsonResponse(
                {
                    "success": True,
                    "message": "Resume fetched successfully",
                    "content": resume.get(
                        "resume_content", ""
                    ),  # Content to display in the modal
                }
            )
        else:
            return JsonResponse({"success": False, "message": "Resume not found"})
    except Exception as e:
        return JsonResponse({"success": False, "message": str(e)})


def view_resume(request, resume_id):
    # MongoDB se resume fetch karna
    resume = resume_collection.find_one({"_id": resume_id})

    if resume:
        return render(
            request, "resume_detail.html", {"resume": resume["resume_content"]}
        )
    else:
        return render(request, "resume_detail.html", {"error": "Resume not found"})


def recent_activity_view(request):
    try:
        # Fetch recent activity from MongoDB, including cv_id and cv_date, sorted by cv_date in descending order
        recent_activities = list(
            resume_collection.find({}, {"_id": 0, "cv_id": 1, "cv_date": 1}).sort(
                "cv_date", DESCENDING
            )
        )

        # Pagination setup
        paginator = Paginator(recent_activities, 5)  # 5 items per page
        page_number = request.GET.get("page")
        page_obj = paginator.get_page(page_number)

        # Render the data to the template
        return render(request, "recent.html", {"page_obj": page_obj})

    except Exception as e:
        return render(request, "recent.html", {"error": str(e)})


def test_data(request):
    # Dummy data
    dummy_data = {
        "name": "John Doe",
        "resume_content": "<p>This is a test resume content.</p>",
    }

    # MongoDB me data insert karna
    result = resume_collection.insert_one(dummy_data)

    # Agar data successfully insert ho gaya, toh response bhejna
    if result.acknowledged:
        return JsonResponse(
            {"success": True, "message": "Dummy data inserted successfully!"}
        )
    else:
        return JsonResponse(
            {"success": False, "message": "Failed to insert dummy data"}
        )
