# 🐞 Bug Hunter

Bug Hunter is an interactive web application for practicing **code-review skills**.  
Users review predefined source files, mark suspicious lines, and classify issues
from a built-in catalogue. The app checks the answers and gives immediate
feedback. Admins can create new tasks and assign them to groups.


## Running the whole app with Docker Compose

> Requires **Docker 20+** and **Docker Compose v2**.

## 1. Clone the repository

```bash
git clone https://github.com/…/bug-hunter.git
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