FROM python:3.12-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

RUN python manage.py makemigrations core && \
    python manage.py migrate && \
    python load.py

EXPOSE 8000

CMD ["sh", "-c", "python manage.py runserver 0.0.0.0:$PORT"]