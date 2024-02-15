import typing as t

from codex.web.models import read
from codex.web.models.base import Model
from codex.web.models.read import CharacterRead, UserRead, WorldRead, SettingRead, CampaignRead, CharacterHistoryRead


class CharacterHistoryFull(Model):
    character_history: CharacterHistoryRead
    campaign: CampaignRead


class CharacterFull(Model):
    character: CharacterRead
    based_on: t.List[CharacterRead]
    extended_by: t.List[CharacterRead]
    happenings: t.List[CharacterHistoryFull]
    owner: UserRead


class UserFull(Model):
    user: UserRead
    characters: t.List[CharacterRead]
    worlds: t.List[WorldRead]
    settings: t.List[SettingRead]
    campaigns: t.List[CampaignRead]


class SettingFull(Model):
    setting: SettingRead
    campaigns: t.List[CampaignRead]
    world: WorldRead
    owner: UserRead


class WorldFull(Model):
    world: WorldRead
    creator: UserRead
    based_on: t.Optional[WorldRead]
    settings: t.List[SettingRead]


class CampaignHistory(Model):
    character_history: CharacterHistoryRead
    character: CharacterRead


class CampaignFull(Model):
    campaign: CampaignRead
    members: t.List[UserRead]
    dm: UserRead
    setting: t.List[SettingRead]
    happenings: t.List[CampaignHistory]
