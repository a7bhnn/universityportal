from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import HttpResponseForbidden
from .models import Student


#def student_list(request):
    #return HttpResponse("List of students")

def hello_world(request):
    #returns raw text, not html
    return HttpResponse("Welcome to UnivertityHub!")

from django.shortcuts import render
from .models import Course

def course_list(request):
    # fetching data from db
    all_courses = Course.objects.all()
    # context - a dictionary mapping template variable names to python objects   
    context = {
        'courses' : all_courses,
        'page_title' : 'Available Courses'
    }
    # render : combine the request, the template, and the data
    return render(request, 'academic/course_list.html', context)
from django.shortcuts import render, redirect
from .forms import StudentForm
from django.contrib.auth.models import User

def student_create(request):

    if request.method == 'POST':
        
        # bind data to form
        form = StudentForm(request.POST)
        
        # validation check
        if form.is_valid():
            # get login fields saftely
            username = request.POST.get('username', '').strip()
            password = request.POST.get('password', '').strip()
            email = request.POST.get('email', '').strip()

            #validate login fields first
            if not username or not password or not email:
                return render(request, 'academic/student_form.html', {''
                'form': form,
                'error': 'All fields are required.'
                })
            
            # prevent duplicate username crash
            if User.objects.filter(username=username).exists():
                return render(request, 'academic/student_form.html', {
                    'form': form,
                    'error': 'Username already exists.'
                })
            
            #create user first
            user = User.objects.create_user(
                username=username, 
                password=password, 
                email=email
                )
            
            # then create student object 
            student = form.save(commit=False) #create student object but dont save to db yet
            student.user = user #link the student to the user account
            student.save()

            #save to db
            form.save_m2m()
            #redirect
            return redirect('course_list')  # Redirect to the course list view after successful creation
    else:
        #get request - create empty form
        form = StudentForm()
    
    return render(request, 'academic/student_form.html', {'form': form})

from django.contrib.auth.forms import UserCreationForm

def register_user(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')  # Redirect to login page after successful registration
    else:
        form = UserCreationForm()
    
    return render(request, 
                  'registration/register.html',
                  {'form': form})    


# 1. the @login_required decorator 
# if a guest tries to access this, they are redirected to the login page automatically
@login_required

def student_profile(request, id):
    # 1. fetch the requested profile
    profile = Student.objects.get(id=id)
    # 2. check if the logged in user is the owner of the profile
    #(assuming we linked the student model to the user model
    if request.user != profile.user:
        return HttpResponseForbidden("You are not allowed to view this profile.")
    return HttpResponse("profile allowed")

@login_required

def course_list(request):
    #logic remains the same
    courses = Course.objects.all()
   
    return render(
        request, 
        "academic/course_list.html",
        {"courses": courses}
    )
# 2.custom permission checks
# define a check function: returns True if user is staff, False otherwise
def is_admin(user):
    return user.is_staff

@user_passes_test(is_admin)
def delete_student(request, id):
    # only staff can access this code
    student= Student.objects.get(id=id)
    if student.user:
        student.user.delete() #delete the associated user account
    else:
        student.delete() #delete the student record if no associated user account exists
    return redirect('course_list')

#JSON
from django.http import JsonResponse
def api_course_list(request):
    # 1. Get data
    courses = Course.objects.all()

    # 2. Convert python objects to Dictionary (serialization)
    # We cannot send Python objects directly as JSON, we need to convert them to a format that can be easily converted to JSON (like dictionaries and lists)
    data = {
        'count': courses.count(),
        'results': list(courses.values('name', 'code', 'credits'))
    }

    # 3. Return JSON response
    return JsonResponse(data)
        
from rest_framework import viewsets
from .models import Course, Student
from .serializers import CourseSerializer, StudentSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

from rest_framework.permissions import IsAuthenticated
class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]  

