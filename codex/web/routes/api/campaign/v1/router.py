import fastapi.routing
from fastapi import Depends
from codex.database import Campaign, Character, Setting
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
def campaigns_get(*, current_user=Depends(get_current_user)):
    return Campaign.nodes.all()


@router.get("/{campaign_id}",
            summary="Get data about a specific campaign",
            status_code=200, response_model=CampaignFull)
def campaign_get(*, campaign_id: str, current_user=Depends(get_current_user)):
    c = Campaign.nodes.get(uid=campaign_id)
    return CampaignFull(campaign=c, members=c.members.all(), dm=c.dm.all()[0], setting=c.setting.all(),
                        happenings=[CampaignHistory(character_history=
                        CharacterHistoryRead(
                            content=c.happenings.relationship(cha).content),
                            character=cha)
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


@router.post("/{campaign_id}/char/{char_id}", summary="Add a character to a specific campaign",
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


@router.post("/{campaign_id}/char/{setting_id}", summary="Add a setting to a specific campaign", status_code=201,
             response_model=CampaignRead)
def campaign_add_setting(*, campaign_id: str, setting_id: str, current_user=Depends(get_current_user)):
    campaign = Campaign.nodes.get(uid=campaign_id)
    if not campaign.dm.is_connected(current_user):
        raise Denied
    setting = Setting.nodes.get(uid=setting_id)
    if setting.campaigns.is_connected(campaign):
        raise Denied
    r = setting.campaigns.connect(campaign)
    r.save()
    r = campaign.setting.connect(campaign)
    r.save()
    return campaign
