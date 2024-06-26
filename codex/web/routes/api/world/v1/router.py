import fastapi.routing
from fastapi import Depends
from codex.database import World
from codex.web.authentication import get_current_user
from codex.web.errors import Denied
from codex.web.crud import *
from codex.web.models.read import WorldRead
from codex.web.models.edit import WorldEdit
from codex.web.models.full import WorldFull
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
def worlds_get():
    return World.nodes.all()


@router.get("/{world_id}",
            summary="Get data about a specific world",
            status_code=200, response_model=WorldFull)
def world_get(*, world_id: str):
    w = World.nodes.get(uid=world_id)
    based_on = None
    tmp = w.based_on.all()
    if len(tmp) > 0:
        based_on = tmp[0]
    return WorldFull(world=w, creator=w.creator.all()[0], based_on=based_on, settings=w.settings.all())


@router.post("/",
             summary="Create a new world",
             status_code=201, response_model=WorldRead)
def world_create(*, data: WorldEdit, current_user=Depends(get_current_user)):
    world = quick_create(
        World(name=data.name, description=data.description))
    current_user.worlds.connect(world)
    world.creator.connect(current_user)
    return world


@router.patch("/{world_id}",
              summary="Update data about a specific world",
              status_code=200, response_model=WorldRead)
def world_edit(*, world_id: str, data: WorldEdit, current_user=Depends(get_current_user)):
    world = World.nodes.get(uid=world_id)
    if not world.creator.is_connected(current_user) and not current_user.isAdmin:
        raise Denied
    return quick_update(world, data)
