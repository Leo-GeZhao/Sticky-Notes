from django.db import models

# Create your models here.

class Plan(models.Model):
    category = models.CharField(
        max_length=20,
    )
    title = models.CharField(max_length = 50)
    description = models.TextField()
    deadline = models.DateField()
    create_date = models.DateField(auto_now_add=True)
    is_priority = models.BooleanField(default = False)
    is_archived = models.BooleanField(default = False)

    def __str__(self):
        return f"{self.title} estimated to be complete at {self.deadline}, which is created on {self.create_date}"

    # def get_absolute_url(self):
    #     return reverse('plan_detail', kwargs={'plan_id': self.id})
    
    class Meta:
        ordering = ['deadline']

class Progress(models.Model):
    progress = models.CharField(max_length = 100)
    create_date = models.DateField(auto_now_add = True)
    is_complete = models.BooleanField(default = False)
    plan = models.ForeignKey(Plan, on_delete = models.CASCADE, related_name = 'progress')

    def __str__(self):
        return f"{self.progress} made on {self.create_date}"
    
    class Meta:
        ordering = ['create_date']