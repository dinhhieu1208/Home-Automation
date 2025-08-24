from app.db.session import db

members_collection = db["members"]

async def get_member_by_email(email: str):
    return await members_collection.find_one({"email": email})

async def create_member(user_dict: dict):
    result = await members_collection.insert_one(user_dict)
    user_dict["_id"] = str(result.inserted_id)
    return user_dict

