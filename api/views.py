from django.shortcuts import render
from rest_framework import generics, status
from .models import Plan, Progress
from .serializers import PlanSerializer, CreatePlanSerializer, ProgressSerializer
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

            # querySet = Plan.objects.filter(title=title)
            # if querySet.exists():
            #     plan = querySet[0]
            #     plan.category = category
            #     plan.description = description
            #     plan.deadline = deadline
            #     plan.is_priority = is_priority
            #     plan.is_archived = is_archived 
            #     plan.save(update_fields=["category", "description", "deadline", "is_priority", "is_archived"])
            #     return Response(PlanSerializer(plan).data, status=status.HTTP_200_OK)
            # else:
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

class PlanDetail(APIView):

    def get_object(self, pk):
        return Plan.objects.get(pk=pk)
    
    def get(self, request, pk, format=None):
        plan = self.get_object(pk)
        serializer = PlanSerializer(plan)
        return Response (serializer.data)
    
    def put(self, request, pk, format=None):
        plan = self.get_object(pk)
        serializer = PlanSerializer(plan, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
    def delete(self, request, pk, format=None):
        plan = self.get_object(pk)
        plan.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Progress

class ProgressList(APIView):
    
    def get(self, request, pk, format=None):
        progress = Progress.objects.filter(plan_id = pk)
        serializer = ProgressSerializer(progress, many=True)
        return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = ProgressSerializer(data = request.data)
        print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk, format=None):
        progress = Progress.objects.get(id = pk)
        print(progress)
        serializer = ProgressSerializer(progress, data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        progress = Progress.objects.get(id = pk)
        progress.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # def post(self, pk, request, format=None):
    #     # plan = Plan.objects.get(pk)
    #     print(pk)
    #     serializer = ProgressSerializer(data = request.data)
    #     if serializer.is_valid():
    #         progress = serializer.data.get('progress')
    #         plan_id = pk
    #         is_completed = False
    #         progress = Progress(
    #                 progress = progress,
    #                 plan_id = plan_id,
    #                 is_completed = is_completed,
    #         )
    #         progress.save()
    #     return Response(ProgressSerializer(progress).data, status=status.HTTP_201_CREATED)
           