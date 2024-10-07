from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

# Create your views here.

def index(response):
    return render(response, "claroapp/base.html", {})

def home(response):
    return render(response, "claroapp/home.html", {})

def login_view(request):
    return render(request, 'claroapp/auth/login.html')

def register_view(request):
    return render(request, 'claroapp/auth/register.html')