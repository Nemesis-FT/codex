"""
Questo modulo contiene utility di autenticazione.
"""
from fastapi import Depends
from fastapi.security import OAuth2, APIKeyHeader
from social_core.backends.oauth import BaseOAuth2
from starlette.requests import Request

from codex.database import User
from codex.web.crud import quick_create


class AuthMasterOAuth2(BaseOAuth2):
    name = "AuthMaster"
    API_URL = "https://authmaster.fermitech.dev/"
    AUTHORIZATION_URL = "https://authmaster.fermitech.dev/oauth/authorize"
    ACCESS_TOKEN_URL = "https://authmaster.fermitech.dev/oauth/token"
    ACCESS_TOKEN_METHOD = "POST"
    REDIRECT_STATE = False
    DEFAULT_SCOPE = ["Profile"]
    EXTRA_DATA = [
        ("id", "id"),
        ("expires_in", "expires"),
        ("refresh_token", "refresh_token"),
    ]

    def api_url(self, path):
        api_url = self.setting("API_URL") or self.API_URL
        return "{}{}".format(api_url.rstrip("/"), path)

    def authorization_url(self):
        return self.api_url("/oauth/authorize")

    def access_token_url(self):
        return self.api_url("/oauth/token")

    def get_user_details(self, response):
        """Return user details from GitLab account"""
        return {
            "username": response.get("username") or "",
            "id": response.get("id"),
        }

    def user_data(self, access_token, *args, **kwargs):
        """Loads user data from service"""
        return self.get_json(
            self.api_url("/api/me"), headers={"Authorization": "Bearer "+access_token}
        )


oauth = OAuth2()
bearer = APIKeyHeader(name='Cookie', scheme_name='authorization')


def get_current_user(request: Request, auth=Depends(oauth), b=Depends(bearer)):
    try:
        user = User.nodes.get(ext_id=request.user.id)
        user.username = request.user.username
        user.save()
        return user
    except Exception:
        user = quick_create(User(ext_id=request.user.id, username=request.user.username))
        return user