from django.shortcuts import render
from rest_framework import generics, status
from .models import Plan
from .serializers import PlanSerializer, CreatePlanSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class PlanView(generics.ListAPIView):
    serializer_class = PlanSerializer

    queryset = Plan.objects.all()

class CreatePlanView(APIView):
    serializer_class = CreatePlanSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            category = serializer.data.get('category')
            title = serializer.data.get('title')
            description = serializer.data.get('description')
            deadline = serializer.data.get('deadline')
            is_priority = serializer.data.get('is_priority')
            is_archived = serializer.data.get('is_archived') if serializer.data.get('is_archived') else False

            querySet = Plan.objects.filter(title=title)
            if querySet.exists():
                plan = querySet[0]
                plan.category = category
                plan.description = description
                plan.deadline = deadline
                plan.is_priority = is_priority
                plan.is_archived = is_archived 
                plan.save(update_fields=["category", "description", "deadline", "is_priority", "is_archived"])
                return Response(PlanSerializer(plan).data, status=status.HTTP_200_OK)
            else:
                plan = Plan(
                    title = title,
                    category = category,
                    description = description,
                    deadline = deadline,
                    is_priority = is_priority,
                    is_archived = is_archived)
                plan.save()
                return Response(PlanSerializer(plan).data, status=status.HTTP_201_CREATED)
        
        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        plan = self.get_object(pk)
        plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class PlanDetail(APIView):

    def get_object(self, pk):
        return Plan.objects.get(pk=pk)
    
    def get(self, request, pk, format=None):
        plan = self.get_object(pk)
        serializer = PlanSerializer(plan)
        return Response (serializer.data)
  
    def delete(self, request, pk, format=None):
        plan = self.get_object(pk)
        plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)