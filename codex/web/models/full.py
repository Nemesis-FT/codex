import typing as t

from codex.web.models import read

__all__ = (
    "UserFull",
)


class UserFull(read.UserRead):
    """
    **Full** model (with expanded relationships) for :class:`.database.tables.User`.
    """

    class Config(read.UserRead.Config):
        schema_extra = {
            "example": {

            },
        }
