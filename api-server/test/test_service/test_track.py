from app.repository.repo import get_session
import app.service.track as track_service
from app.schema.track import TrackUploadForm
from app.schema.category import CategoryResponse


def mock_track_upload_form() -> TrackUploadForm:
    track_name = "kimi no namaiewasasdfdasesssss"
    track_length = 110
    artists_id = []
    categories = ["anime", "pop"]
    track_form = TrackUploadForm(
        name=track_name,
        length=track_length,
        artists_id=artists_id,
        categories=categories,
    )
    return track_form


def test_upload_track():
    track_form = mock_track_upload_form()
    track_response = track_service.upload_track(track_form=track_form)

    track_service.delete_track_by_id(id=track_response.id)

    assert track_response.name == track_form.name
    assert track_response.length == track_form.length
    # assert track_response.categories == CategoryResponse()


def test_get_track_by_id():
    track_form = mock_track_upload_form()
    track_response = track_service.upload_track(track_form=track_form)

    id = track_response.id

    track_response = track_service.get_track_by_id(id)

    track_service.delete_track_by_id(id)

    assert track_response.name == track_form.name
    assert track_response.length == track_form.length
