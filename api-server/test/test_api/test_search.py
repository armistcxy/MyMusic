from test.test_api import client


def test_search_artist():
    artist_name = "BIG BANG"
    response = client.get(f"/search/{artist_name}/artists")
    json = response.json()
    assert len(json) == 1


def test_search_track():
    track_name = "super shy"
    response = client.get(f"/search/{track_name}/tracks")
    json = response.json()
    assert len(json) == 1
    assert json[0]["name"] == "Super Shy"


def test_search_album():
    album_name = "stand up"
    response = client.get(f"/search/{album_name}/albums")
    json = response.json()
    assert len(json) == 1
    assert json[0]["name"] == "Stand Up"

def test_general_search():
    name = "super"
    response = client.get(f"/search/{name}")
    json = response.json()
    assert len(json) > 0
    
    track_result = json[0]
    artist_result = json[1]
    album_result = json[2] 
    
    assert len(track_result) == 3
    assert len(artist_result) == 1
    assert len(album_result) == 3