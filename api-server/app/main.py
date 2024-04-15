from fastapi import FastAPI
from repository.repo import get_db
from model import models

api = FastAPI()


def j4test():
    from repository.track import TrackRepo

    track_repo = TrackRepo()
    track = models.Track(name="Sparkle", length=6 * 60 + 50)
    track = track_repo.insert_track(track)


j4test()
