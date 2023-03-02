from datetime import datetime

from fastapi import UploadFile

from codex.database import User


def get_user(uid: int):
    return User.nodes.get(id=uid)


def get_user_by_email(email: str):
    return User.nodes.get(email=email)


def get_users():
    return User.nodes.all()
