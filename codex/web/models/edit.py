import typing as t
import pydantic
from uuid import UUID
from codex.web.models import base

__all__ = (
    "UserEdit",
)


class UserEdit(base.ORMModel):
    """
    **Edit** model for :class:`.database.tables.User`.
    """

    email: str
    password: str

    class Config(base.ORMModel.Config):
        schema_extra = {
            "example": {
                "email": "pippo@gmail.com",
                "password": "1pippo"
            },
        }
