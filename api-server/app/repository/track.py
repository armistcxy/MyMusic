from app.model import models
import uuid
from sqlalchemy import func, text
from sqlalchemy.orm import Session


class TrackRepo:
    def insert_track(self, track: models.Track, session: Session) -> models.Track:
        session.add(track)
        session.commit()
        session.refresh(track)
        return track

    def get_all_tracks(self, session: Session) -> list[models.Track]:
        tracks = session.query(models.Track).all()
        return tracks

    def get_track_by_id(self, id: uuid.UUID, session: Session) -> models.Track:
        track = session.get(models.Track, ident=id)
        return track

    def delete_track(self, id: uuid.UUID, session: Session) -> bool:
        track = session.get(models.Track, ident=id)
        if track == None:
            return False
        else:
            session.delete(track)
            session.commit()
            return True

    def find_track_with_name(self, name: str, session: Session) -> list[models.Track]:
        ts_query = func.plainto_tsquery("simple", name)
        tracks = (
            session.query(models.Track)
            .filter(func.to_tsvector("simple", models.Track.name).op("@@")(ts_query))
            .all()
        )
        return tracks

    def update_track(self, track: models.Track, session: Session) -> models.Track:
        pass
