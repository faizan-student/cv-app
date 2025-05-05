import os
from dotenv import load_dotenv
from pymongo import MongoClient


load_dotenv()


MONGO_URI = os.getenv("MONGO_URI")


client = MongoClient(MONGO_URI)


db1 = client["ccptest"]
resume_collection = db1["resumes"]


db2 = client["user_cv_data"]
user_cv_data_collection = db2["user_cv_data_collection"]
