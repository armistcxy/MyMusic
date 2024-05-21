from httpx import AsyncClient
import pytest
from app.main import api


# @pytest.mark.anyio
# async def test_crawl():
#     track_name_list = [
#         "nang tho",
#         "call of silence",
#         "love you with all my heart",
#         "duong toi cho em ve",
#     ]
#     async with AsyncClient(app=api, base_url="http://test") as ac:
#         for track_name in track_name_list:
#             ac.post(f"/crawl/download?track_name={track_name}")
