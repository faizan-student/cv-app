from django.urls import path
from .views import *
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path("test-mongo/", test_mongo_connection),
    path("", save_resume, name="save_resume"),
    path("view_resume/<str:resume_id>/", view_resume, name="view_resume"),
    path("test_data/", test_data, name="test_data"),
    path("history/", list_resumes, name="history"),
    path("delete_resume/<str:cv_id>/", delete_resume, name="delete_resume"),
    path("detail_resume/<str:cv_id>/", detail_resume, name="detail_resume"),
    path("save_resume/<str:cv_id>/", save_resume, name="save_resume_with_cv_id"),
    path("recent/", recent_activity_view, name="recent"),
    path("resume-form/", resume_form),
    path("submit-resume/", submit_resume, name="submit_resume"),
    path("get-resume/", get_resume_data, name="get_resume"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
