from datetime import datetime
from uuid import UUID
from codex.web.models import edit, base

__all__ = (
    "UserRead",
)


class UserRead(base.ORMModel):
    """
    **Read** model for :class:`.database.tables.User`.
    """
    uid: str
    email: str
    isAdmin: bool

