import typing as t
import pydantic
from uuid import UUID
from codex.web.models import base

__all__ = (
    "UserEdit",
    "WorldEdit",
    "SettingEdit",
    "CharacterEdit"
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


class SettingEdit(base.ORMModel):
    timeframe: str
    description: str


class CharacterEdit(base.ORMModel):
    name: str
    race: str
    levels: str
    backstory: t.Optional[str]
    alive: bool
    based_on_id: t.Optional[str]
