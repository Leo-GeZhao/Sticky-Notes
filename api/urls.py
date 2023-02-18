from django.urls import path
from .views import PlanView, CreatePlanView,PlanDetail, ProgressList
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('plans/', PlanView.as_view()),
    path('create-plan/', CreatePlanView.as_view()),
    path('plan/<int:pk>/', PlanDetail.as_view()),


    path('plan/<int:pk>/progress/', ProgressList.as_view()),
    path('add-progress/', ProgressList.as_view()),
    path('progress/<int:pk>/delete-progress/', ProgressList.as_view()),
    path('progress/<int:pk>/toggle-completion/', ProgressList.as_view()),


]

urlpatterns = format_suffix_patterns(urlpatterns)

# http://localhost:8000/api/progress/7/toggle-completion/

#    "id": 7,
#         "progress": "fsafsafsafsa",
#         "plan": 3,
#         "create_date": "2023-02-18",
#         "is_complete": false