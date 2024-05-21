from test.test_api import client


def test_get_artist_by_id():
    id = "52ee507b-8d5b-4397-aeb4-3269cf58cd57"
    response = client.get(f"/artists/{id}")
    assert response.status_code == 200
    json = response.json()
    assert json["name"] == "Jay Park"
    assert json["id"] == "52ee507b-8d5b-4397-aeb4-3269cf58cd57"

    id = "52ee507b-8d5b-4397-aeb4-3269cf58cd56"

    response = client.get(f"/artists/{id}")
    assert response.status_code == 404


def test_upload_artist():
    json = {"name": "Artist1", "description": "Best artist ever"}
    response = client.post("/artists/", json=json)

    assert response.status_code == 201
    json_resp = response.json()
    assert json_resp["name"] == json["name"]
    assert json_resp["description"] == json["description"]

    # clean (so next test time won't be affected)
    id = json_resp["id"]
    client.delete(f"/artists/{id}")


def test_delete_artist():
    json = {"name": "Artist1", "description": "Best artist ever"}
    json_resp = client.post("/artists/", json=json).json()

    id = json_resp["id"]
    response = client.get(f"/artists/{id}")
    assert response.status_code == 200

    client.delete(f"/artists/{id}")

    response = client.get(f"/artists/{id}")
    assert response.status_code == 404


def test_get_artist_by_name():
    name = "Jay Park"
    response = client.get(f"/artists/name/{name}")
    json = response.json()

    assert response.status_code == 200
    assert json["name"] == "Jay Park"


def test_get_tracks_of_artist():
    id = "d4836a92-97bf-401a-b2f1-694f1459937e"

    response = client.get(f"/artists/{id}/tracks")
    json = response.json()

    ground_truth = set(
        [
            "쏘리 쏘리 Sorry, Sorry",
            "Lo Siento",
            "Mamacita (아야야)",
            "미인아 Bonamana",
            "Mr. Simple",
        ]
    )

    result = set()
    for track in json:
        result.add(track["name"])

    for truth in ground_truth:
        assert truth in result
