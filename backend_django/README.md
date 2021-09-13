# Getting Started with Create Django Project

## Installing Django and its dependencies
```bash
#Create virtual env
python -m venv employee_env

#Switch to virtual employee_env
$ employee_env\Scripts\activate

(employee_env) C:\Employee-Fullstack>

#Install Django and its dependencies
pip install django djangorestframework django-cors-headers

#Create Django Project
django-admin startproject backend_django

#Switch to backend_django Directory
cd backend_django
(employee_env) C:\Employee-Fullstack\backend_django>

#Run following command to create a app in backend_django project
manage.py startapp employee

#Create Sql scripts for models
manage.py makemigrations

#Create table structures on database
manage.py migrate

#Create a Admin User to handle registered apps into admin
manage.py createsuperuser

#To start django project ,In the project directory, you can run:
Runs the app in the development mode.\
Open http://localhost:8000 to view it in the browser.
```

