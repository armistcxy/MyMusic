from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, ForeignKey, Integer, String, Table, Computed
from sqlalchemy.orm import relationship
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

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
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

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
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

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, nullable=False, unique=True, index=True)
    username = Column(String, nullable=False)
    password = Column(String, nullable=False)

    artists = relationship(
        "Artist", secondary=ArtistUser, back_populates="users", lazy=True
    )


class Album(Base):
    __tablename__ = "albums"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)

    artists = relationship(
        "Artist", secondary=ArtistAlbum, back_populates="albums", lazy=True
    )


class Playlist(Base):
    __tablename__ = "playlists"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    user_id = Column(UUID, ForeignKey("users.id"))
    user = relationship("User", backref="playlists", lazy=True)
    tracks = relationship(
        "Track", secondary=TrackPlaylist, back_populates="playlists", lazy=True
    )


class Category(Base):
    __tablename__ = "categories"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, unique=True, nullable=False)

    tracks = relationship(
        "Track", secondary=TrackCategory, back_populates="categories", lazy=True
    )


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
