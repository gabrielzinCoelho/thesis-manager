FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN python manage.py makemigrations core && \
    python manage.py migrate && \
    python load.py

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]