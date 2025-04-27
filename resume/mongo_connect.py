import os
from dotenv import load_dotenv
from pymongo import MongoClient

# Load .env file
load_dotenv()

# Access MongoDB URI from .env
MONGO_URI = os.getenv("MONGO_URI")

# Establish MongoDB connection
client = MongoClient(MONGO_URI)

# Select the database (can be any name you want)
db = client["ccptest"]  # MongoDB database name
resume_collection = db["resumes"]  # Collection (like table in SQL)
