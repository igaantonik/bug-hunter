from fastapi import FastAPI
from app.database import db


app = FastAPI()

@app.get("/")
def read_root():
    db.admin.command('ping')
    return {"Hello": "World"}
