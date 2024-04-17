from app.model import models
from app.repository.repo import get_session
import uuid
from sqlalchemy import func
from sqlalchemy.orm import Session


class AlbumRepo:
    def insert_album(self, album: models.Album, session: Session) -> models.Album:
        session.add(album)
        session.commit()
        session.refresh(album)
        return album

    def get_album_by_id(self, id: uuid.UUID, session: Session) -> models.Album:
        album = session.get(models.Album, ident=id)
        return album

    def delete_album(self, id: uuid.UUID, session: Session) -> bool:
        session = get_session()
        album = session.get(models.Album, ident=id)
        if album == None:
            return False
        else:
            session.delete(album)
            session.commit()
            return True

    def find_album_with_name(self, name: str, session: Session) -> list[models.Album]:
        session = get_session()
        ts_query = func.plainto_tsquery("simple", name)
        albums = (
            session.query(models.album)
            .filter(func.to_tsvector("simple", models.Album.name).op("@@")(ts_query))
            .all()
        )
        return albums
