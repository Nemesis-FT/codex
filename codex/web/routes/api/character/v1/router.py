import fastapi.routing
from fastapi import Depends
from codex.database import Character, User
from codex.web.authentication import get_current_user
from codex.web.errors import Denied, ResourceNotFound
from codex.web.crud import *
from codex.web.models.read import CharacterRead, CharacterHistoryRead, CharacterRelationshipRead
from codex.web.models.edit import CharacterEdit, CharacterCreate, CharacterRelationshipEdit
from codex.web.models.full import CharacterFull, CharacterHistoryFull, CharacterRelationshipFull
import typing as t

router = fastapi.routing.APIRouter(
    prefix="/api/character/v1",
    tags=[
        "Character v1",
    ],
)


@router.get("/",
            summary="Get the list of root characters",
            status_code=200, response_model=t.List[CharacterRead])
def chars_get(*, current_user=Depends(get_current_user)):
    return [c for c in Character.nodes.all() if len(c.based_on) == 0]


@router.get("/{char_id}",
            summary="Get data about a specific character",
            status_code=200, response_model=CharacterFull)
def char_get(*, char_id: str, current_user=Depends(get_current_user)):
    c = Character.nodes.get(uid=char_id)
    return CharacterFull(character=c, based_on=c.based_on.all(), extended_by=c.extended_by.all(),
                         owner=c.owner.all()[0],
                         happenings=[CharacterHistoryFull(character_history=
                         CharacterHistoryRead(
                             content=c.events.relationship(campaign).content,
                             campaign=campaign), campaign=campaign)
                             for campaign in c.events.all()],
                         relationships=[CharacterRelationshipFull(
                             character_relationship=CharacterRelationshipRead(content=c.relationships.relationship(target).type),
                             character=target) for target in c.relationships.all()])


@router.post("/",
             summary="Create a new character",
             status_code=201, response_model=CharacterRead)
def char_create(*, data: CharacterCreate, current_user=Depends(get_current_user)):
    if data.based_on_id:
        if not Character.nodes.get(uid=data.based_on_id):
            raise ResourceNotFound
    char = quick_create(
        Character(name=data.name, race=data.race, levels=data.levels, backstory=data.backstory,
                  alive=data.alive))
    if data.owner_override == "" or not data.owner_override:
        current_user.characters.connect(char)
        char.owner.connect(current_user)
    else:
        user = User.nodes.get(uid=data.owner_override)
        user.characters.connect(char)
        char.owner.connect(user)
    if data.based_on_id:
        base = Character.nodes.get(uid=data.based_on_id)
        char.based_on.connect(base)
        base.extended_by.connect(char)
    return char


@router.patch("/{char_id}",
              summary="Update data about a specific character",
              status_code=200, response_model=CharacterRead)
def char_edit(*, char_id: str, data: CharacterEdit, current_user=Depends(get_current_user)):
    char = Character.nodes.get(uid=char_id)
    if not char.owner.is_connected(current_user):
        raise Denied
    return quick_update(char, data)


@router.post("/{char_id}/relationship/{target_character}",
             summary="Add relationship between two characters",
             status_code=200, response_model=CharacterRead)
def char_add_relationship(*, char_id: str, target_character: str, data: CharacterRelationshipEdit,
                          current_user=Depends(get_current_user)):
    char: Character = Character.nodes.get(uid=char_id)
    if not char.owner.is_connected(current_user):
        raise Denied
    target = Character.nodes.get(uid=target_character)
    if not char.relationships.is_connected(target):
        r = char.relationships.connect(target, {"type": data.content})
        r.save()
    if target.owner.is_connected(current_user):
        if not target.relationships.is_connected(char):
            r = target.relationships.connect(char, {"type": data.content})
            r.save()
    return char


@router.delete("/{char_id}/relationship/{target_character}",
               summary="Delete a relationship between two characters",
               status_code=200, response_model=CharacterRead)
def char_del_relationship(*, char_id: str, target_character: str,
                          current_user=Depends(get_current_user)):
    char: Character = Character.nodes.get(uid=char_id)
    if not char.owner.is_connected(current_user):
        raise Denied
    target = Character.nodes.get(uid=target_character)
    target.relationships.disconnect(char)
    char.relationships.disconnect(target)
    target.save()
    char.save()
    return char
