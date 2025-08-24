from app.db.session import db
from sqlalchemy.orm import Session
from app.models.user import User

admin_collection = db["admin"]

async def get_admin_by_email(email: str):
    return await admin_collection.find_one({"email": email})


def get_admin_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id, User.is_admin==True).first()

def update_admin(db: Session, db_user: User, update_data: dict):
    for field, value in update_data.items():
        if field != "role" and hasattr(db_user, field) and value is not None:
            setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user
