from test.test_api import client


def test_get_track_by_id():
    id = "6849777d-68bf-4f5c-9ffe-652a1912434c"
    response = client.get(f"/tracks/{id}")
    assert response.status_code == 200
    json = response.json()
    assert json["name"] == "SPOT!"
    assert json["length"] == 167
    assert json["album"] == "SPOT!"


def test_find_track_with_name():
    name = "GODS"
    response = client.get(f"/tracks/search/v1/{name}")
    assert response.status_code == 200
    json = response.json()
    assert len(json) == 1
    track = json[0]
    assert track["name"] == "GODS"
    assert track["length"] == 220


# def test_find_track_with_name():

# def test_create_track():
#     json = {
#         "name": ""
#     }
#     client.post(f"/tracks/",json=)
