from fastapi import FastAPI
from app.routers.task_router import task_router
from app.routers.smell_router import smell_router
from app.routers.review_router import review_router


app = FastAPI()

app.include_router(task_router, prefix="/api/v1", tags=["tasks"])
app.include_router(smell_router, prefix="/api/v1", tags=["smells"])
app.include_router(review_router, prefix="/api/v1", tags=["reviews"])
