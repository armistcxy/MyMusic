from model import models
from repository.repo import get_db
import uuid


class TrackRepo:
    def insert_track(self, track: models.Track) -> models.Track:
        db = get_db()
        db.add(track)
        db.commit()
        db.refresh(track)
        return track

    def get_track_by_id(id: uuid.UUID) -> models.Track:
        db = get_db()
        track = db.get(models.Track).filter(models.User.id == id).first()
        return track

    def delete_track(id: uuid.UUID) -> bool:
        db = get_db()
        track = db.get(models.Track).filter(models.User.id == id).first()
        if track == None:
            return False
        else:
            db.delete(track)
            db.commit()
            return True
