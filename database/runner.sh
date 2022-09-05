docker build -t matheus/postgres:latest .
docker run -d --name postgres -p 5432:5432 matheus/postgres