from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as dj_login


# Create your views here.
def home(request):
    return render(request, 'authentication/index.html')

def signup(request):
    
    if request.method == 'POST':
        username = request.POST['username']
        email = request.POST['email']
        pass1 = request.POST['pass1']
        pass2 = request.POST['pass2']

        myuser = User.objects.create_user(username, email, pass1)

        myuser.save()

        messages.success(request, 'Account created successfully')

        return redirect('login')

    return render(request, 'authentication/signup.html')

def login(request):

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)

        if user is not None:
            dj_login(request, user)
            fname = user.username
            return render(request, 'authentication/index.html', {'fname': username})

        else:
            messages.error(request, 'Bad credentials')
            return redirect('home')

    return render(request, 'authentication/login.html')

def logout(request):
    pass