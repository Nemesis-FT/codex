import fastapi.routing
from fastapi import Depends

from codex.web.models.read import PlanetariumRead

router = fastapi.routing.APIRouter(
    prefix="/api/server/v1",
    tags=[
        "Server v1",
    ],
)


@router.get("/planetarium",
            summary="Get data about server",
            status_code=200, response_model=PlanetariumRead)
def planetarium_get():
    return PlanetariumRead(version="0.1", type="Codex")