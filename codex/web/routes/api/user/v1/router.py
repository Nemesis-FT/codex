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


@router.post("/",
             summary="Create a new user",
             status_code=201, response_model=UserRead
             )
def user_create(*, data: UserEdit, current_user: User = Depends(get_current_user)):
    if not current_user.isAdmin:
        raise Denied
    return quick_create(
        User(email=data.email, password=bcrypt.hashpw(bytes(data.password, encoding="utf-8"), bcrypt.gensalt()),
             username=data.username))


@router.put("/{user_id}",
            summary="Edit a selected user",
            status_code=200, response_model=UserRead)
def user_edit(*, user_id: str, data: UserEdit, current_user: User = Depends(get_current_user)):
    user = User.nodes.get(uid=user_id)
    if user.id != current_user.id:
        raise Denied
    user.password = bcrypt.hashpw(bytes(data.password, encoding="utf-8"), bcrypt.gensalt())
    user.email = data.email
    user.save()
    return user
