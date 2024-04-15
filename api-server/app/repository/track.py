from model import models
from repository.repo import get_db
import uuid
from sqlalchemy import func, text


class TrackRepo:
    def insert_track(self, track: models.Track) -> models.Track:
        db = get_db()
        db.add(track)
        db.commit()
        db.refresh(track)
        return track

    def get_track_by_id(self, id: uuid.UUID) -> models.Track:
        db = get_db()
        track = db.get(models.Track, ident=id)
        return track

    def delete_track(self, id: uuid.UUID) -> bool:
        db = get_db()
        track = db.get(models.Track, ident=id)
        if track == None:
            return False
        else:
            db.delete(track)
            db.commit()
            return True

    def find_track_with_name(self, name: str) -> list[models.Track]:
        db = get_db()
        ts_query = func.plainto_tsquery("simple", name)
        tracks = (
            db.query(models.Track)
            .filter(func.to_tsvector("simple", models.Track.name).op("@@")(ts_query))
            .all()
        )
        return tracks
