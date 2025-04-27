from pymongo import MongoClient

MONGO_URI = "mongodb+srv://ccp_message:ccp_resume_c@ccptest.rqltj2b.mongodb.net/?retryWrites=true&w=majority&appName=ccptest"

client = MongoClient(MONGO_URI)

# Select the database (can be any name you want)
db = client["ccptest"]  # MongoDB database name
resume_collection = db["resumes"]  # Collection (like table in SQL)
