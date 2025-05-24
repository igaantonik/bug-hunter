from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.task_router import task_router
from app.routers.smell_router import smell_router
from app.routers.review_router import review_router
from app.routers.file_router import file_router
from app.routers.feedback_router import feedback_router


app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(task_router, prefix="/api/v1", tags=["tasks"])
app.include_router(smell_router, prefix="/api/v1", tags=["smells"])
app.include_router(review_router, prefix="/api/v1", tags=["reviews"])
app.include_router(file_router, prefix="/api/v1", tags=["files"])
app.include_router(feedback_router, prefix="/api/v1", tags=["feedbacks"])
