import pathlib

import fastapi
import pkg_resources
from fastapi import Depends
from fastapi.security import OAuth2PasswordRequestForm
from starlette import status
from starlette.exceptions import HTTPException

from codex.web.authentication import authenticate_user, create_token, Token
from codex.web.errors import ApplicationException

from codex.web.routes.api.user.v1.router import router as user_router
from codex.web.routes.api.world.v1.router import router as world_router
from codex.web.routes.api.setting.v1.router import router as setting_router
from codex.web.routes.api.character.v1.router import router as character_router

from neomodel.exceptions import UniqueProperty, MultipleNodesReturned, DoesNotExist
from handlers import handle_generic_error, handle_application_error, handle_neomodel_not_found, \
    handle_neomodel_not_unique, handle_neomodel_multiple_results

with open(pathlib.Path(__file__).parent.joinpath("description.md")) as file:
    description = file.read()

app = fastapi.FastAPI(
    debug=False,
    title="Codex",
    description=description,
    version="0.1",
)

app.include_router(user_router)
app.include_router(world_router)
app.include_router(setting_router)
app.include_router(character_router)

app.add_exception_handler(DoesNotExist, handle_neomodel_not_found)
app.add_exception_handler(UniqueProperty, handle_neomodel_not_unique)
app.add_exception_handler(MultipleNodesReturned, handle_neomodel_multiple_results)
app.add_exception_handler(ApplicationException, handle_application_error)
app.add_exception_handler(Exception, handle_generic_error)

@app.post("/token", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Funzione di autenticazione. Se le credenziali sono corrette viene restituito un JWT
    :param form_data: informazioni di autenticazione
    :return: un dict contenente il token e il suo tipo
    """
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password",
                            headers={"WWW-Authenticate": "Bearer"})
    token = create_token(data={"sub": user.email})
    return {"access_token": token, "token_type": "bearer"}