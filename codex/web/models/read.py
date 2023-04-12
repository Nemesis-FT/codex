from datetime import datetime
from uuid import UUID
from codex.web.models import edit, base

__all__ = (
    "UserRead",
    "WorldRead",
    "SettingRead"
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