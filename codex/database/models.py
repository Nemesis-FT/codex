from neomodel import (StructuredNode, StructuredRel, BooleanProperty, StringProperty, IntegerProperty, UniqueIdProperty, RelationshipTo, Relationship, install_labels,
                      remove_all_labels,install_all_labels, DateProperty, One, ZeroOrMore, OneOrMore)
from codex.database.db import db

__all__ = (
    "User"
)


class PartecipationRel(StructuredRel):
    character = RelationshipTo("Character", "IN", cardinality=OneOrMore)


class CharacterHistoryRel(StructuredRel):
    content = StringProperty(required=True)


class User(StructuredNode):
    email = StringProperty(unique_index=True, required=True)
    password = StringProperty(required=True)

    characters = RelationshipTo("Character", "CREATED", ZeroOrMore)
    partecipations = RelationshipTo("Campaign", "PARTECIPATES", cardinality=ZeroOrMore, model=PartecipationRel)
    campaigns = RelationshipTo('Campaign', 'OWNS', cardinality=ZeroOrMore)
    worlds = RelationshipTo("World", "CREATED", cardinality=ZeroOrMore)


class Campaign(StructuredNode):
    name = StringProperty(required=True)
    start_date = DateProperty(required=True)
    end_date = DateProperty(required=False)
    synopsis = StringProperty()
    retelling = StringProperty()

    members = RelationshipTo("User", "PLAYED", cardinality=ZeroOrMore, model=PartecipationRel)
    dm = RelationshipTo('User', 'HOSTS', cardinality=One)
    setting = RelationshipTo("Setting", "SET", cardinality=One)
    happenings = RelationshipTo("Character", "HAPPENED", cardinality=ZeroOrMore, model=CharacterHistoryRel)


class Character(StructuredNode):
    name = StringProperty(required=True)
    race = StringProperty(required=True)
    levels = StringProperty(required=False)
    backstory = StringProperty(required=False)
    alive = BooleanProperty(required=True)

    owner = RelationshipTo("User", "CREATED", cardinality=One)
    based_on = RelationshipTo("Character", "BASED_ON", cardinality=One)
    events = RelationshipTo("Campaign", "DID", cardinality=ZeroOrMore, model=CharacterHistoryRel)


class Setting(StructuredNode):
    timeframe = StringProperty()
    description = StringProperty()

    campaigns = RelationshipTo("Campaign", "HOSTS", cardinality=ZeroOrMore)
    world = RelationshipTo("World", "SET", cardinality=One)


class World(StructuredNode):
    name = StringProperty(unique_index=True, required=True)
    descritpion = StringProperty()

    creator = RelationshipTo("User", "CREATES", One)
    based_on = Relationship("World", "BASED_ON")
    settings = RelationshipTo("Setting", "HAS", cardinality=ZeroOrMore)


#import datetime
#date = datetime.datetime.now().date()
#campaign = Campaign(name="Test", start_date=date).save()
#campaign.dm.connect(User.nodes.get(email="lorenzo.balugani@gmail.com"))