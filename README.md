# Random

https://github.com/TarasSavchyn/random.git

## Content

- [technologies](#technologies)
- [documentation](#documentation)
- [docker](#docker)
- [project developers](#project-developers)

## Technologies

- [Python](https://www.python.org/)
- [Django](https://www.djangoproject.com/)
- [Django-Rest-Framework](https://www.django-rest-framework.org/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)
- [React](https://react.dev/), [React Router](https://reactrouter.com/en/main)
- [Axios](https://axios-http.com/)

## Documentation

http://127.0.0.1:8080/api/doc/swagger/

http://127.0.0.1:8080/api/doc/redoc/

## Using

Clone the repository from GitHub:

```sh
$ git clone https://github.com/TarasSavchyn/random.git
```

Once you've cloned the repository, navigate into the repository.

Create a virtual environment and activate it using the following commands:

```sh
$ python3 -m venv venv
$ source venv/bin/activate
```

In directory backend create file ".env" with the following content:

```python
SECRET_KEY = django - insecure - 6 @)+w & 9$u
# ^_t(lyeot%naf8j-#m9#k+k9ra66jgyn6d42bfx3
POSTGRES_HOST = cornelius.db.elephantsql.com
POSTGRES_DB = etipyymx
POSTGRES_USER = etipyymx
POSTGRES_PASSWORD = 26
gb925HbCdZE2AO - ug0r2FEiozWI1Ws
```

Random/backend$ :
Backend:

```sh
$ pip install -r requirements.txt
```

```sh
$ python3 manage.py migrate
```

```sh
$ python3 manage.py runserver 8080
```

SoloAgency/frontend$ :
Frontend:

```sh
$ npm install
```

```sh
$ npm run dev
```

Go to the web browser and enter http://localhost:3000/

## Docker

In directory backend create file ".env" with the following content:

```python
SECRET_KEY=django-insecure-6@)+w&9$u#^_t(lyeot%naf8j-#m9#k+k9ra66jgyn6d42bfx3
POSTGRES_HOST=cornelius.db.elephantsql.com
POSTGRES_DB=etipyymx
POSTGRES_USER=etipyymx
POSTGRES_PASSWORD=26gb925HbCdZE2AO-ug0r2FEiozWI1Ws
```

After that create the file "docker-compose.yml"

```python
version: "3.4"

services:
backend:
image: savik1992 / random - backend:latest
ports:
- "8080:8080"
command: sh - c
"python manage.py migrate && python manage.py runserver 0.0.0.0:8080"
env_file:
- backend /.env
depends_on:
- db
healthcheck:
test: ["CMD-SHELL", "pg_isready -U habrpguser -d habrdb"]
interval: 10
s
timeout: 5
s
retries: 5
start_period: 10
s

frontend:
image: savik1992 / random - frontend:latest
ports:
- "3000:3000"
depends_on:
- backend

db:
image: postgres:14 - alpine
env_file:
- .env
```

After create directory backend with file .env as in example.

Then open your terminal and navigate to the directory you wish to store the project and run the following commands:

```sh
$ docker-compose up
```

Welcome, the application is ready to use at url http://localhost:3000/

## Project developers

- [Taras Savchyn](https://www.linkedin.com/in/taras-savchyn-ba2705261/) — Python Developer
