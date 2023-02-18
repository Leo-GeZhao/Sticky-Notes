from rest_framework import serializers
from .models import Plan, Progress

class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ("id","category", "title", "description", "deadline", "create_date", "is_priority", "is_archived" )

class CreatePlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ("category", "title", "description", "deadline", "is_priority", "is_archived")

class ProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Progress
        fields = ("id","progress", "plan","create_date", "is_complete")

# class CreateProgressSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Plan
#         fields = ("category", "title", "description", "deadline", "is_priority", "is_archived")