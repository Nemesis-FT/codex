from datetime import datetime
from uuid import UUID

from codex.web.models import edit

__all__ = (
    "UserRead",
)


class UserRead(edit.UserEdit):
    """
    **Read** model for :class:`.database.tables.User`.
    """

    id: UUID
    application_id: UUID

    class Config(edit.UserEdit.Config):
        schema_extra = {
            "example": {
                **edit.UserEdit.Config.schema_extra["example"],
                "application_id": "971851d4-b41f-46e1-a884-5b5e84a276f8",
                "id": "ee4855c6-5690-4a88-9999-950b3ae92473",
            },
        }
