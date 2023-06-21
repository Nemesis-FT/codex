from datetime import datetime
from uuid import UUID
import typing as t
from codex.web.models import edit, base

__all__ = (
    "UserRead",
    "WorldRead",
    "SettingRead",
    "CharacterRead"
)


class UserRead(base.ORMModel):
    """
    **Read** model for :class:`.database.models.User`.
    """
    uid: str
    email: str
    isAdmin: bool


class WorldRead(edit.WorldEdit):
    """
    **Read** model for :class: .database.models.World`
    """
    uid: str


class SettingRead(edit.SettingEdit):
    uid: str


class CharacterRead(base.ORMModel):
    uid: str
    name: str
    race: str
    levels: str
    backstory: t.Optional[str]
    alive: bool