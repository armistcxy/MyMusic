from test.test_api import client


def test_create_playlist():
    payload = {
        "name": "iwano",
        "email": "iwano@gmail.com",
        "password": "Clock-123456789",
    }

    response = client.post("/users/register", json=payload)

    id = response.json()["id"]

    json = {
        "email": "iwano@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)

    access_token = response.json()["access_token"]

    header_auth = {"Authorization": f"Bearer {access_token}"}

    payload = {"name": "playlist1", "user_id": id}
    response = client.post("/playlists/", headers=header_auth, json=payload)

    json = response.json()
    assert json["name"] == payload["name"]


def test_manage_playlist_01():
    json = {
        "email": "iwano@gmail.com",
        "password": "Clock-123456789",
    }
    response = client.post("/users/login/", json=json)
    access_token = response.json()["access_token"]

    header_auth = {"Authorization": f"Bearer {access_token}"}

    response = client.get("/playlists/me", headers=header_auth)

    json = response.json()

    playlist_id = json[0]["id"]

    payload = {
        "rename": "playlist2",
        "track_id_list": [
            "6849777d-68bf-4f5c-9ffe-652a1912434c",
            "b27737bb-eb98-42fa-89e3-7b584645aea5",
            "8affb741-98f5-404b-81e5-29bd1501619d",
        ],
    }
    client.patch(f"/playlists/{playlist_id}", headers=header_auth, json=payload)

    response = client.get(f"/playlists/{playlist_id}")
    json = response.json()
    assert json["name"] == "playlist2"
    assert len(json["tracks"]) == 3
