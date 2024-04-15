from model import models
from repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


class ArtistRepo:
    def insert_artist(self, artist: models.Artist, session: Session) -> models.Artist:
        session.add(artist)
        session.commit()
        session.refresh(artist)
        return artist

    def get_artist_by_id(self, id: uuid.UUID, session: Session) -> models.Artist:
        artist = session.get(models.Artist, ident=id)
        return artist

    def delete_artist(self, id: uuid.UUID, session: Session) -> bool:
        session = get_session()
        artist = session.get(models.Artist, ident=id)
        if artist == None:
            return False
        else:
            session.delete(artist)
            session.commit()
            return True

    def find_artist_with_name(self, name: str, session: Session) -> list[models.Artist]:
        session = get_session()
        ts_query = func.plainto_tsquery("simple", name)
        artists = (
            session.query(models.Artist)
            .filter(func.to_tsvector("simple", models.Artist.name).op("@@")(ts_query))
            .all()
        )
        return artists
