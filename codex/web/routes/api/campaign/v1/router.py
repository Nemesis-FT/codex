import fastapi.routing
from fastapi import Depends
from codex.database import Campaign, Character, Setting, User
from codex.web.authentication import get_current_user
from codex.web.errors import Denied, ResourceNotFound
from codex.web.crud import *
from codex.web.models.read import CampaignRead, CharacterHistoryRead
from codex.web.models.edit import CampaignEdit, CharacterHistoryEdit
from codex.web.models.full import CampaignFull, CharacterHistoryFull, CampaignHistory
import typing as t

router = fastapi.routing.APIRouter(
    prefix="/api/campaign/v1",
    tags=[
        "Campaign v1",
    ],
)


@router.get("/",
            summary="Get the list of campaigns",
            status_code=200, response_model=t.List[CampaignRead])
def campaigns_get():
    return Campaign.nodes.all()


@router.get("/{campaign_id}",
            summary="Get data about a specific campaign",
            status_code=200, response_model=CampaignFull)
def campaign_get(*, campaign_id: str):
    c = Campaign.nodes.get(uid=campaign_id)
    return CampaignFull(campaign=c, members=c.members.all(), dm=c.dm.all()[0], setting=c.setting.all(),
                        happenings=[CampaignHistory(character_history=
                        CharacterHistoryRead(
                            content=c.happenings.relationship(cha).content),
                            character=cha, owner=cha.owner.get())
                            for cha in c.happenings.all()])


@router.post("/",
             summary="Create a new campaign",
             status_code=201, response_model=CampaignRead)
def campaign_create(*, data: CampaignEdit, current_user=Depends(get_current_user)):
    campaign = quick_create(
        Campaign(name=data.name, start_date=data.start_date, end_date=data.end_date,
                 synopsis=data.synopsis, retelling=data.retelling)
    )
    current_user.campaigns.connect(campaign)
    campaign.dm.connect(current_user)
    return campaign


@router.patch("/{campaign_id}",
              summary="Update data about a specific campaign",
              status_code=200, response_model=CampaignRead)
def campaign_edit(*, campaign_id: str, data: CampaignEdit, current_user=Depends(get_current_user)):
    campaign = Campaign.nodes.get(uid=campaign_id)
    if not campaign.dm.is_connected(current_user):
        raise Denied
    return quick_update(campaign, data)


@router.post("/{campaign_id}/character/{char_id}", summary="Add a character to a specific campaign",
             status_code=200, response_model=CampaignRead)
def campaign_add_character(*, campaign_id: str, char_id: str, data: CharacterHistoryEdit,
                           current_user=Depends(get_current_user)):
    campaign = Campaign.nodes.get(uid=campaign_id)
    if not campaign.dm.is_connected(current_user):
        raise Denied
    character = Character.nodes.get(uid=char_id)
    if character.events.is_connected(campaign):
        raise Denied
    r = character.events.connect(campaign, {"content": data.content})
    r.save()
    r = campaign.happenings.connect(character, {"content": data.content})
    r.save()
    return campaign


@router.post("/{campaign_id}/setting/{setting_id}", summary="Add a setting to a specific campaign", status_code=201,
             response_model=CampaignRead)
def campaign_add_setting(*, campaign_id: str, setting_id: str, current_user=Depends(get_current_user)):
    campaign = Campaign.nodes.get(uid=campaign_id)
    if not campaign.dm.is_connected(current_user):
        raise Denied
    setting = Setting.nodes.get(uid=setting_id)
    if setting.campaigns.is_connected(campaign):
        raise Denied
    setting.campaigns.connect(campaign)
    campaign.setting.connect(setting)
    return campaign


@router.post("/{campaign_id}/user/{user_id}/{character_id}", summary="Add a user to a specific campaign",
             status_code=201,
             response_model=CampaignRead)
def campaign_add_user(*, campaign_id: str, user_id: str, character_id: str, current_user=Depends(get_current_user)):
    campaign = Campaign.nodes.get(uid=campaign_id)
    if not campaign.dm.is_connected(current_user):
        raise Denied
    user = User.nodes.get(uid=user_id)
    if user.partecipations.is_connected(campaign):
        return campaign
    character = Character.nodes.get(uid=character_id)
    if not character.owner.is_connected(user):
        raise Denied
    r = user.partecipations.connect(campaign, {"character": character_id})
    r.save()
    r = campaign.members.connect(user, {"character": character_id})
    r.save()
    return campaign


@router.delete("/{campaign_id}/clear", summary="Clears all dependencies of the campaign", response_model=CampaignRead)
def campaign_clear(*, campaign_id: str, current_user=Depends(get_current_user)):
    campaign = Campaign.nodes.get(uid=campaign_id)
    if not campaign.dm.is_connected(current_user):
        raise Denied
    for setting in campaign.setting.all():
        setting.campaigns.disconnect(campaign)
        setting.save()
    campaign.setting.disconnect_all()
    for happening in campaign.happenings.all():
        happening.events.disconnect(campaign)
        happening.save()
    campaign.happenings.disconnect_all()
    for member in campaign.members.all():
        member.partecipations.disconnect(campaign)
        member.save()
    campaign.members.disconnect_all()
    campaign.save()
    return campaign
