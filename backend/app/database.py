from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()


def get_mongodb_client():
    uri = os.getenv("MONGODB_URI")
    client = MongoClient(uri)
    return client


db = get_mongodb_client()
