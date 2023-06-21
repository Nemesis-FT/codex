import typing as t

from codex.web.models import read
from codex.web.models.base import Model
from codex.web.models.read import CharacterRead, UserRead


class CharacterFull(Model):
    character: CharacterRead
    based_on: t.List[CharacterRead]
    owner: UserRead
