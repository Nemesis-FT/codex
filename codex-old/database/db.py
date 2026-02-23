from neomodel import config, db

config.DATABASE_URL = "bolt://neo4j:password@localhost:7687"
db.set_connection(config.DATABASE_URL)