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

## How to use

### Preparation
install and activate virtual environment:
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

# How to run
script to run service:
```bash
python manage.py runserver
```

### After changing any static files
```bash
python manage.py collectstatic
```

## Features


