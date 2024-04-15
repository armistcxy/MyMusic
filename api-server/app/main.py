from fastapi import FastAPI
from repository.repo import get_db
from model import models

api = FastAPI()


def j4test():
    from repository.track import TrackRepo

    track_repo = TrackRepo()
    # track = models.Track(name="you and I are future", length=2 * 60 + 44)
    # track = track_repo.insert_track(track)

    tracks = track_repo.find_track_with_name("you are")
    for track in tracks:
        print(track.name)


j4test()
