from neomodel import (StructuredNode, StringProperty, IntegerProperty, UniqueIdProperty, RelationshipTo, Relationship, install_labels,
                      remove_all_labels,install_all_labels, DateProperty, One, ZeroOrMore)
from db import db


class User(StructuredNode):
    user_id = UniqueIdProperty()
    email = StringProperty(unique_index=True, required=True)
    password = StringProperty(required=True)

    campaigns = RelationshipTo('Campaign', 'OWNS', cardinality=ZeroOrMore)
    worlds = RelationshipTo("World", "CREATED", cardinality=ZeroOrMore)


class Campaign(StructuredNode):
    campaign_id = UniqueIdProperty()
    start_date = DateProperty(required=True)
    end_date = DateProperty(required=False)
    synopsis = StringProperty()
    retelling = StringProperty()

    dm = RelationshipTo('User', 'HOSTS', cardinality=One)
    setting = RelationshipTo("Setting", "SET", cardinality=One)


class Setting(StructuredNode):
    setting_id = UniqueIdProperty()
    timeframe = StringProperty()
    description = StringProperty()

    campaigns = RelationshipTo("Campaign", "HOSTS", cardinality=ZeroOrMore)
    world = RelationshipTo("World", "SET", cardinality=One)


class World(StructuredNode):
    world_id = UniqueIdProperty()
    name = StringProperty(unique_index=True, required=True)
    descritpion = StringProperty()

    creator = RelationshipTo("User", "CREATES", One)
    based_on = Relationship("World", "BASED_ON")
    settings = RelationshipTo("Setting", "HAS", cardinality=ZeroOrMore)


install_all_labels()

user = User(user_id=1, email="lorenzo.balugani@gmail.com", password="password").save()
print(user)
print(User.nodes.all())