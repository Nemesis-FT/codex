from datetime import datetime
from uuid import UUID
import typing as t
from codex.web.models import edit, base

__all__ = (
    "UserRead",
    "WorldRead",
    "SettingRead",
    "CharacterRead",
    "CampaignRead",
    "CharacterHistoryRead",
    "PlanetariumRead"
)


class UserRead(base.ORMModel):
    """
    **Read** model for :class:`.database.models.User`.
    """
    uid: str
    email: str
    username: str
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


class CampaignRead(edit.CampaignEdit):
    uid: str


class CharacterHistoryRead(edit.CharacterHistoryEdit):
    pass


class PlanetariumRead(base.Model):
    version: str
    type: str
