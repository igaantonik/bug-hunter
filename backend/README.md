# Backend – FastAPI service

Prerequisites
- Python 3.12
- Poetry 2.1 or newer
- MongoDB running at the address in .env file
## Quick start
### 1. Secrets
```bash
cd backend
cp .env.example .env        # replace with your secrets
```
## 2. Install dependencies
```bash
poetry install            
```
## 3. Run the app
```bash
poetry run uvicorn app.main:app --reload --port 8000
```
---
## Useful commands
```bash
poetry run ruff check app   # lint
```