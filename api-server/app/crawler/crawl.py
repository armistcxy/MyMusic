import asyncio
import time
from typing import Any, Coroutine
from playwright.async_api import async_playwright, Playwright, Page
import os
from slugify import slugify

URL = "https://w9.mp3-juices.nu/"


async def download(
    page: Coroutine[Any, Any, Page],
    track_title: str,
    artist: str,
    save_path: str | None = None,
):
    await page.goto(URL)
    await page.locator("#query").fill(f"{track_title} {artist}")
    await page.get_by_role("button").click()
    async with page.expect_download() as download_info:
        await page.locator("xpath=/html/body/div[3]/div[1]/div[2]/a[1]").click()
        await page.locator('xpath=//*[@id="1"]').click()
    download = await download_info.value

    save_name = f"{slugify(track_title)}.mp3"
    path = os.path.join(save_path, save_name) if save_path else save_name
    await download.save_as(path)


async def run(
    playwright: Playwright, track_infos: list[(str, str)], save_path: str | None = None
):
    chromium = playwright.chromium
    browser = await chromium.launch()
    context = await browser.new_context(accept_downloads=True)
    tasks = []
    for title, artist in track_infos:
        task = asyncio.create_task(
            download(
                await context.new_page(),
                track_title=title,
                artist=artist,
                save_path=save_path,
            )
        )
        tasks.append(task)

    for task in tasks:
        await task

    await browser.close()


import time


async def crawl(track_infos: list[(str, str | None)], save_path: str | None = None):
    print(f"started at: {time.strftime('%X')}")
    async with async_playwright() as playwright:
        await run(playwright, track_infos, save_path)

    print(f"finished at: {time.strftime('%X')}")


# async def main(track_infos):
#     async with async_playwright() as playwright:
#         await run(playwright, track_infos)


# track_infoss = [
#     ("more than words", "羊文学"),
#     ("glimpse of us", "Joji"),
#     ("Sacred Play Secret Place", " Matryoshka"),
#     ("Shape of you", "Ed Sherran"),
#     ("Bad Guy", "Billie Elish"),
#     ("You are everywhere", "young captain"),
# ]
# print(f"started at: {time.strftime('%X')}")
# for track_infos in track_infoss:
#     asyncio.run(main([track_infos]))
# print(f"finished at: {time.strftime('%X')}")
