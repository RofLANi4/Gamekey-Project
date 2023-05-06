# Gamekey-Project

## Technologies

- Django
- PostgreSQL
- HTML, CSS, JS

## News

[11.04.2023]
* template now located in templates folder
* styles now located in static folder
* images now located in static folder
* scripts now located in static folder
* fonts now located in static folder
* all changes in html were automatically made by PyCharm (html works fine now)
* added ability to run service on localhost:8000
* now to see the main page you need to go to http://127.0.0.1:8000/gamekey/

[14.04.2023]
* added models for database
* function based views -> class based views

[5.05.2023]
* all lists on main page were connected to DB

## How to use

### Requirements
* Python 3.7+
* Git

### Preparations
clone repository on your local machine:
```bash
git clone https://github.com/RofLANi4/Gamekey-Project.git
```
change the directory
```bash
cd Gamekey-Project
```
create and activate virtual environment:
```bash
python -m venv venv
```
```bash
venv\Scripts\activate
```
install requirements:
```bash
pip install -r requirements.txt
```
Only if needed to create DB:
```bash
python manage.py migrate
```

To apply styles for project (initial procedure):
```bash
python manage.py collectstatic
```
# How to run
script to run service:
```bash
python manage.py runserver
```
## Development
### After changing any static files
```bash
python manage.py collectstatic
```
### DB files
* DB:  
https://drive.google.com/file/d/16K51s9QhbDvaVkI4XZG9H2iRFkXBEnZu/view?usp=sharing
* Media folder:  
https://drive.google.com/file/d/14sNKPqFrQ2xdgpnsaHceS59EzKJhSZmD/view?usp=sharing
* link for access to folder:  
https://drive.google.com/drive/folders/1yVpAAh5TZGNJV9cSZcerqVP6zl9KvYjG?usp=sharing
## Features

* Main page with game lists from DB


