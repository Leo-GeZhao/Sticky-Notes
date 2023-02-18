# Generated by Django 4.1.2 on 2023-02-16 07:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plan',
            name='category',
            field=models.CharField(max_length=20),
        ),
        migrations.CreateModel(
            name='Progress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('progress', models.CharField(max_length=100)),
                ('create_deate', models.DateField(auto_now_add=True)),
                ('is_complete', models.BooleanField(default=False)),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.plan')),
            ],
            options={
                'ordering': ['create_deate'],
            },
        ),
    ]
