# from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, Table, Computed
from sqlalchemy.orm import (
    relationship,
    declarative_base,
)  # there's warning that declaretive_base from sqlalchemy.ext.declarativate is deprecated
from sqlalchemy.dialects.postgresql import UUID, TSVECTOR
import uuid
from sqlalchemy import func

Base = declarative_base()

TrackArtist = Table(
    "tracks-artists",
    Base.metadata,
    Column("track_id", UUID, ForeignKey("tracks.id")),
    Column("artist_id", UUID, ForeignKey("artists.id")),
)

TrackPlaylist = Table(
    "tracks-playlists",
    Base.metadata,
    Column("track_id", UUID, ForeignKey("tracks.id")),
    Column("playlist_id", UUID, ForeignKey("playlists.id")),
)

TrackCategory = Table(
    "tracks-categories",
    Base.metadata,
    Column("track_id", UUID, ForeignKey("tracks.id")),
    Column("artist_id", UUID, ForeignKey("categories.id")),
)

ArtistUser = Table(
    "artists-users",
    Base.metadata,
    Column("artist_id", UUID, ForeignKey("artists.id")),
    Column("user_id", UUID, ForeignKey("users.id")),
)

ArtistAlbum = Table(
    "artists-albums",
    Base.metadata,
    Column("artist_id", UUID, ForeignKey("artists.id")),
    Column("album_id", UUID, ForeignKey("albums.id")),
)


class Track(Base):
    __tablename__ = "tracks"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    length = Column(Integer, nullable=True)

    artists = relationship(
        "Artist", secondary=TrackArtist, back_populates="tracks", lazy=True
    )
    playlists = relationship(
        "Playlist", secondary=TrackPlaylist, back_populates="tracks", lazy=True
    )
    album_id = Column(UUID, ForeignKey("albums.id"))
    album = relationship("Album", backref="tracks", lazy=True)

    categories = relationship(
        "Category", secondary=TrackCategory, back_populates="tracks", lazy=True
    )


class Artist(Base):
    __tablename__ = "artists"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False, unique=True, index=True)
    description = Column(String, nullable=True)

    tracks = relationship(
        "Track", secondary=TrackArtist, back_populates="artists", lazy=True
    )

    users = relationship(
        "User", secondary=ArtistUser, back_populates="artists", lazy=True
    )

    albums = relationship(
        "Album", secondary=ArtistAlbum, back_populates="artists", lazy=True
    )


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, nullable=False, unique=True, index=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)

    artists = relationship(
        "Artist", secondary=ArtistUser, back_populates="users", lazy=True
    )

    playlists = relationship(
        "Playlist",
        back_populates="user",
        lazy=True,
        cascade="all, delete",  # delete a user cause to delete all playlist he/she created
    )


class Album(Base):
    __tablename__ = "albums"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, nullable=False, unique=True)

    artists = relationship(
        "Artist", secondary=ArtistAlbum, back_populates="albums", lazy=True
    )


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, unique=True)
    user_id = Column(UUID, ForeignKey("users.id"))
    user = relationship("User", back_populates="playlists", lazy=True)
    tracks = relationship(
        "Track", secondary=TrackPlaylist, back_populates="playlists", lazy=True
    )


class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, unique=True, nullable=False, index=True)

    tracks = relationship(
        "Track", secondary=TrackCategory, back_populates="categories", lazy=True
    )


class Admin(Base):
    __tablename__ = "admins"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, unique=True, nullable=False)


class UserMetadata(Base):
    __tablename__ = "usermetas"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("users.id"))
    user = relationship("User", lazy=True)

    track_id = Column(UUID, ForeignKey("tracks.id"))
    track = relationship("Track", lazy=True)


"""
All relationships: 
    track - artist = m : n      checked
    track - playlist = m : n    checked
    track - album = n : 1       checked
    track - category = n : m    checked

    artist - user = m : n       checked
    artist - album = m : n      checked
    
    user - playlist = 1 : n     checked
"""


"""
When delete artist => can't use cascade because the relationship between track and artist is m : n
=> So handle by own code

When delete user => can use cascade delete because the relationship between user and playlist is 1 : n
"""
