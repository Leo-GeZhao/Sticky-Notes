# Generated by Django 4.1.2 on 2023-02-12 06:50

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Plan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.CharField(choices=[('Study', 'Study'), ('Work', 'Work'), ('Life', 'Life')], default='Study', max_length=20)),
                ('title', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('deadline', models.DateField()),
                ('create_date', models.DateField(auto_now_add=True)),
                ('is_priority', models.BooleanField(default=False)),
                ('is_archived', models.BooleanField(default=False)),
            ],
            options={
                'ordering': ['deadline'],
            },
        ),
    ]