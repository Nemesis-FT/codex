import bcrypt
import fastapi.routing
from fastapi import Depends
from codex.database import User
from codex.web.authentication import get_current_user
from codex.web.models.edit import UserEdit

router = fastapi.routing.APIRouter(
    prefix="/api/user/v1",
    tags=[
        "User v1",
    ],
)


@router.post("/me",
             summary="Get data about currently logged in user",
             status_code=200)
def user_get(*, current_user = Depends(get_current_user)):
    return current_user


@router.post("/",
             summary="Create a new user",
             status_code=201
             )
def user_create(*, data: UserEdit):
    h = bcrypt.hashpw(bytes(data.password, encoding="utf-8"), bcrypt.gensalt())
    user = User(email=data.email, password=h).save()
    user.refresh()
    return user