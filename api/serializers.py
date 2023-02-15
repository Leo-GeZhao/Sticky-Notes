from rest_framework import serializers
from .models import Plan

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ("id","category", "title", "description", "deadline", "create_date", "is_priority", "is_archived" )

class CreatePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ("category", "title", "description", "deadline", "is_priority", "is_archived")