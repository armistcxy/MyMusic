from test.test_api import client


def test_get_track_by_id():
    id = "39de6481-bef2-4083-8495-9a1259492e0f"
    response = client.get(f"/tracks/{id}")
    assert response.status_code == 200
    json = response.json()
    assert json["name"] == "Sparkle"
    assert json["length"] == 410


# def test_find_track_with_name():
