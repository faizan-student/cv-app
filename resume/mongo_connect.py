import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load .env file
load_dotenv()

# Access MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Establish MongoDB connection
client = MongoClient(MONGO_URI)

# Select the first database (ccptest)
db1 = client["ccptest"]  # MongoDB database name for resume collection
resume_collection = db1["resumes"]  # Collection (like table in SQL) for resume data

# Select the second database (db2) for user CV data
db2 = client["user_cv_data"]  # MongoDB database name for user CV data
user_cv_data_collection = db2["user_cv_data_collection"]  # Collection for user CV data
