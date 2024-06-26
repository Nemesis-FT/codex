import typing as t
import pydantic
from uuid import UUID
from codex.web.models import base
import datetime

__all__ = (
    "UserEdit",
    "WorldEdit",
    "SettingEdit",
    "CharacterEdit",
    "CharacterCreate",
    "CampaignEdit",
    "CharacterHistoryEdit",
    "CharacterRelationshipEdit"
)


class UserEdit(base.ORMModel):
    """
    **Edit** model for :class:`.database.models.User`.
    """
    username: str


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


class CharacterCreate(CharacterEdit):
    owner_override: t.Optional[str]


class CampaignEdit(base.ORMModel):
    name: str
    start_date: datetime.date
    end_date: t.Optional[datetime.date]
    synopsis: str
    retelling: str


class CharacterHistoryEdit(base.Model):
    content: str

class CharacterRelationshipEdit(base.Model):
    content: str