from fastapi import FastAPI
from app.routers.task_router import task_router


app = FastAPI()

app.include_router(task_router, prefix="/api/v1", tags=["tasks"])
