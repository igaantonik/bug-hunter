from dotenv import load_dotenv
import os
import motor.motor_asyncio

load_dotenv()


def get_mongodb_client():
    uri = os.getenv("MONGODB_URI")
    client = motor.motor_asyncio.AsyncIOMotorClient(uri)
    return client["bug_hunter_dev"]


db = get_mongodb_client()
