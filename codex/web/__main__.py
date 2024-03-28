import logging
import os
from starlette.requests import Request

import bcrypt
import dotenv
import fastapi.middleware.cors as cors
import uvicorn
from fastapi import Depends

from codex.configuration import JWT_KEY, OAUTH2_CLIENT, OAUTH2_SECRET
from codex.database import User
from codex.web.crud import quick_create

from fastapi_oauth2.middleware import OAuth2Middleware
from fastapi_oauth2.config import OAuth2Config, OAuth2Client
from fastapi.security import OAuth2PasswordRequestForm, APIKeyHeader
from fastapi_oauth2.claims import Claims
from fastapi_oauth2.security import OAuth2
from authentication import AuthMasterOAuth2, oauth, bearer

logging.basicConfig(level="INFO")
log = logging.getLogger(__name__)

dotenv.load_dotenv(".env", override=True)
dotenv.load_dotenv(".env.local", override=True)

from codex.web.app import app

log.info("Creating CORS middleware...")
app.add_middleware(
    cors.CORSMiddleware,
    allow_origins=os.environ["CORS_ALLOW_ORIGINS"].split(" "),
    allow_methods=["*"],
    allow_headers=["*"],
)
log.info("Setting up authmaster middleware...")

app.add_middleware(OAuth2Middleware, config=OAuth2Config(
    allow_http=True,
    jwt_secret=JWT_KEY,
    clients=[
        OAuth2Client(
            backend=AuthMasterOAuth2,
            client_id=OAUTH2_CLIENT,
            client_secret=OAUTH2_SECRET,
            redirect_uri="http://127.0.0.1:8000/login_callback",
            scope=["Profile"],
            claims=Claims(username=lambda u: u.username, email=lambda u: u.email, id=lambda u: u.id)
        )
    ]
))


@app.get("/login_callback")
async def login_callback(request: Request, b=Depends(bearer)):
    # Attempt to find user in database, and update its data. If it's the first login for the user, create a new profile.
    try:
        user = User.nodes.get(ext_id=request.user.id)
        user.username = request.user.username
        user.save()
    except Exception:
        quick_create(User(ext_id=request.user.id, username=request.user.username))
    finally:
        return {"token": b}

log.info("Running codex application with Uvicorn...")
# noinspection PyTypeChecker
uvicorn.run(app, port=int(os.environ["IS_WEB_PORT"]), host=os.environ["IS_WEB_HOST"])
