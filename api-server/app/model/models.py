from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
import uuid

Base = declarative_base()


class Track(Base):
    __tablename__ = "tracks"

    id = Column(uuid.UUID, primary_key=True)
    name = Column(String, unique=True, index=True, nullable=False)
    length = Column(Integer, nullable=True)


class Arist(Base):
    __tablename__ = "artists"

    id = Column(uuid.UUID, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)


class User(Base):
    __tablename__ = "users"

    id = Column(uuid.UUID, primary_key=True)
    email = Column(String, nullable=False, unique=True, index=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)


class Album(Base):
    __tablename__ = "albums"

    id = Column(uuid.UUID, primary_key=True)
    name = Column(String, nullable=False)


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(uuid.UUID, primary_key=True)
    name = Column(String, nullable=False)
    user_id = Column(uuid.UUID, )

class Category(Base):
    __tablename__ = "categories"

    id = Column(uuid.UUID, primary_key=True)
    name = Column(String, unique=True, nullable=False)
