import fastapi.routing
from fastapi import Depends
from codex.database import Setting, World
from codex.web.authentication import get_current_user
from codex.web.errors import Denied
from codex.web.crud import *
from codex.web.models.read import SettingRead
from codex.web.models.edit import SettingEdit
import typing as t

router = fastapi.routing.APIRouter(
    prefix="/api/setting/v1",
    tags=[
        "Setting v1",
    ],
)


@router.get("/",
            summary="Get the list of available settings",
            status_code=200, response_model=t.List[SettingRead])
def worlds_get(*, current_user=Depends(get_current_user)):
    return Setting.nodes.all()


@router.get("/{setting_id}",
            summary="Get data about a specific setting",
            status_code=200, response_model=SettingRead)
def world_get(*, setting_id: str, current_user=Depends(get_current_user)):
    return Setting.nodes.get(uid=setting_id)


@router.post("/{world_id}",
             summary="Create a new setting related to a world",
             status_code=201, response_model=SettingRead)
def world_create(*, world_id: str, data: SettingEdit, current_user=Depends(get_current_user)):
    world = World.nodes.get(uid=world_id)
    setting = quick_create(
        Setting(timeframe=data.timeframe, description=data.description))
    current_user.settings.connect(setting)
    setting.owner.connect(current_user)
    setting.world.connect(world)
    world.settings.connect(setting)
    return setting


@router.patch("/{setting_id}",
              summary="Update data about a specific setting",
              status_code=200, response_model=SettingRead)
def world_get(*, setting_id: str, data: SettingEdit, current_user=Depends(get_current_user)):
    setting = Setting.nodes.get(uid=setting_id)
    if not setting.owner.is_connected(current_user):
        raise Denied
    return quick_update(setting, data)