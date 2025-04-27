from django.urls import path
from .views import *

urlpatterns = [
    path("test-mongo/", test_mongo_connection),
    path("", save_resume, name="save_resume"),
    # URL for viewing a specific resume (resume_id ke saath)
    path("view_resume/<str:resume_id>/", view_resume, name="view_resume"),
    path("test_data/", test_data, name="test_data"),
    path("history/", list_resumes),
    path("delete_resume/<str:cv_id>/", delete_resume, name="delete_resume"),
    path("detail_resume/<str:cv_id>/", detail_resume, name="detail_resume"),
    path("save_resume/<str:cv_id>/", save_resume, name="save_resume_with_cv_id"),
    path("recent/", recent_activity_view),
]
