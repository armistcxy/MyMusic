FROM python:3.10.14-slim

WORKDIR /app

COPY . /app

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip install psycopg2

RUN pip install -r requirements.txt
