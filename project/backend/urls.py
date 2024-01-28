from django.urls import path 

from . import views

urlpatterns = [path("user", views.AddUser.as_view()),
               path("login", views.LoginUser.as_view()),
               path("materials", views.GetMaterials.as_view()),
               path("get-projects", views.GetProjects.as_view())]  