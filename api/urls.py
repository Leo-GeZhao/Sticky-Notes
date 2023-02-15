from django.urls import path
from .views import PlanView, CreatePlanView,PlanDetail
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    path('plans', PlanView.as_view()),
    path('create-plan/', CreatePlanView.as_view()),
    path('plan/<int:pk>', PlanDetail.as_view())

]

urlpatterns = format_suffix_patterns(urlpatterns)