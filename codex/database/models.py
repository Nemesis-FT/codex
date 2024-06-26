from neomodel import (StructuredNode, StructuredRel, BooleanProperty, StringProperty, IntegerProperty, UniqueIdProperty,
                      RelationshipTo, Relationship, install_labels,
                      remove_all_labels, install_all_labels, DateProperty, One, ZeroOrMore, ZeroOrOne, OneOrMore)
from codex.database.db import db

__all__ = (
    "User", "World", "Character", "Setting", "Campaign"
)


class PartecipationRel(StructuredRel):
    character = StringProperty(required=True)


class CharacterHistoryRel(StructuredRel):
    content = StringProperty(required=True)


class CharacterRelationship(StructuredRel):
    type = StringProperty(required=True)


class User(StructuredNode):
    uid = UniqueIdProperty()
    ext_id = IntegerProperty(unique_index=True, required=True)
    username = StringProperty(required=True)
    isAdmin = BooleanProperty(default=False)

    characters = RelationshipTo("Character", "CREATED", ZeroOrMore)
    partecipations = RelationshipTo("Campaign", "PARTECIPATES", cardinality=ZeroOrMore, model=PartecipationRel)
    campaigns = RelationshipTo('Campaign', 'OWNS', cardinality=ZeroOrMore)
    worlds = RelationshipTo("World", "CREATED", cardinality=ZeroOrMore)
    settings = RelationshipTo("Setting", "CREATED", cardinality=ZeroOrMore)


class Campaign(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(required=True)
    start_date = DateProperty(required=True)
    end_date = DateProperty(required=False)
    synopsis = StringProperty()
    retelling = StringProperty()

    members = RelationshipTo("User", "PLAYED", cardinality=ZeroOrMore, model=PartecipationRel)
    dm = RelationshipTo('User', 'HOSTS', cardinality=One)
    setting = RelationshipTo("Setting", "SET", cardinality=ZeroOrMore)
    happenings = RelationshipTo("Character", "HAPPENED", cardinality=ZeroOrMore, model=CharacterHistoryRel)


class Character(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(required=True)
    race = StringProperty(required=True)
    levels = StringProperty(required=False)
    backstory = StringProperty(required=False)
    alive = BooleanProperty(required=True)

    owner = RelationshipTo("User", "CREATED", cardinality=One)
    based_on = RelationshipTo("Character", "BASED_ON", cardinality=ZeroOrOne)
    extended_by = RelationshipTo("Character", "EXTENDS", cardinality=ZeroOrMore)
    events = RelationshipTo("Campaign", "DID", cardinality=ZeroOrMore, model=CharacterHistoryRel)
    relationships = RelationshipTo("Character", "KNOWS", cardinality=ZeroOrMore, model=CharacterRelationship)


class Setting(StructuredNode):
    uid = UniqueIdProperty()
    timeframe = StringProperty()
    description = StringProperty()

    campaigns = RelationshipTo("Campaign", "HOSTS", cardinality=ZeroOrMore)
    world = RelationshipTo("World", "SET", cardinality=One)
    owner = RelationshipTo("User", "CREATED", cardinality=One)


class World(StructuredNode):
    uid = UniqueIdProperty()
    name = StringProperty(unique_index=True)
    description = StringProperty(required=True)

    creator = RelationshipTo("User", "CREATED", One)
    based_on = Relationship("World", "BASED_ON")
    settings = RelationshipTo("Setting", "HAS", cardinality=ZeroOrMore)


from neomodel import config

# before loading your node definitions
config.AUTO_INSTALL_LABELS = True
# import datetime
# date = datetime.datetime.now().date()
# campaign = Campaign(name="Test", start_date=date).save()
# campaign.dm.connect(User.nodes.get(email="lorenzo.balugani@gmail.com"))
