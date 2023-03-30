import typing as t
import pydantic
from uuid import UUID
from codex.web.models import base

__all__ = (
    "UserEdit",
    "WorldEdit"
)


class UserEdit(base.ORMModel):
    """
    **Edit** model for :class:`.database.models.User`.
    """

    email: str
    password: str


class WorldEdit(base.ORMModel):
    name: str
    description: str