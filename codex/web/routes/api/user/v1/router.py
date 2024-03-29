import bcrypt
import fastapi.routing
from fastapi import Depends
from codex.database import User
from codex.web.authentication import get_current_user
from codex.web.models.edit import UserEdit
from codex.web.errors import Denied
from codex.web.models.read import UserRead
from codex.web.models.full import UserFull
from codex.web.crud import *
import typing as t

router = fastapi.routing.APIRouter(
    prefix="/api/user/v1",
    tags=[
        "User v1",
    ],
)


@router.get("/", summary="Get data about users", status_code=200, response_model=t.List[UserRead])
def users_get(*, current_user=Depends(get_current_user)):
    return User.nodes.all()

@router.get("/me",
            summary="Get data about currently logged in user",
            status_code=200, response_model=UserFull)
def user_get(*, current_user=Depends(get_current_user)):
    return UserFull(user=current_user, characters=current_user.characters.all(), worlds=current_user.worlds.all(),
                    settings=current_user.settings.all(), campaigns=current_user.campaigns.all())
