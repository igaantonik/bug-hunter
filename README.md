# 🐞 Bug Hunter

Bug Hunter is an interactive web application designed to help users improve their Code Review skills. Users can analyze predefined code files, highlight suspected issues, and assign error types from a predefined list. The system automatically evaluates the selections and provides feedback. The application supports skill development through hands-on practice, while administrators can add and manage tasks for different user groups.


## Running the whole app with Docker Compose

> Requires **Docker 20+** and **Docker Compose v2**.

## 1. Clone the repository

```bash
git clone https://github.com/igaantonik/bug-hunter.git
```

## 3. Create a `.env` file

```bash
cd bug-hunter
cp backend/.env.example backend/.env      # replace with your secrets
```
## 3. Build and run the app

```bash
docker compose up --build
```