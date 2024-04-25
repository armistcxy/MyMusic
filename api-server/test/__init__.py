from app.main import api
from fastapi.testclient import TestClient

client = TestClient(app=api)


# just running command pytest from Mymusic/api-server directory
