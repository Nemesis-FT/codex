import fastapi.routing
from fastapi import Depends
from codex.database import World
from codex.web.authentication import get_current_user
from codex.web.errors import Denied
from codex.web.crud import *
from codex.web.models.read import WorldRead
from codex.web.models.edit import WorldEdit
import typing as t

router = fastapi.routing.APIRouter(
    prefix="/api/world/v1",
    tags=[
        "World v1",
    ],
)


@router.get("/",
            summary="Get the list of available worlds",
            status_code=200, response_model=t.List[WorldRead])
def worlds_get(*, current_user=Depends(get_current_user)):
    return World.nodes.all()


@router.get("/{world_id}",
            summary="Get data about a specific world",
            status_code=200, response_model=WorldRead)
def world_get(*, world_id: str, current_user=Depends(get_current_user)):
    return World.nodes.get(uid=world_id)


@router.post("/",
             summary="Create a new world",
             status_code=201, response_model=WorldRead)
def world_create(*, data: WorldEdit, current_user=Depends(get_current_user)):
    world = quick_create(
        World(name=data.name, description=data.description))
    current_user.worlds.connect(world)
    world.owner.connect(current_user)
    return world


@router.patch("/{world_id}",
              summary="Update data about a specific world",
              status_code=200, response_model=WorldRead)
def world_edit(*, world_id: str, data: WorldEdit, current_user=Depends(get_current_user)):
    world = World.nodes.get(uid=world_id)
    if not world.owner.is_connected(current_user):
        raise Denied
    return quick_update(world, data)