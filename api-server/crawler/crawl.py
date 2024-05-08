import asyncio
import time
from typing import Any, Coroutine
from playwright.async_api import async_playwright, Playwright, Page

URL = "https://w9.mp3-juices.nu/"


async def download(page: Coroutine[Any, Any, Page], track_title: str, artist: str):
    await page.goto(URL)
    await page.locator("#query").fill(track_title)
    await page.get_by_role("button").click()
    async with page.expect_download() as download_info:
        await page.locator("xpath=/html/body/div[3]/div[1]/div[2]/a[1]").click()
        await page.locator('xpath=//*[@id="1"]').click()
    download = await download_info.value

    await download.save_as(f"{track_title}_{artist}.mp3")


async def run(playwright: Playwright, track_infos: list[(str, str)]):
    chromium = playwright.chromium
    browser = await chromium.launch()
    context = await browser.new_context(accept_downloads=True)
    tasks = []
    for title, artist in track_infos:
        task = asyncio.create_task(
            download(await context.new_page(), track_title=title, artist=artist)
        )
        tasks.append(task)

    for task in tasks:
        await task

    await browser.close()


import time


async def crawl():
    print(f"started at: {time.strftime('%X')}")
    track_infos = [
        ("more than words", "羊文学"),
        ("glimpse of us", "Joji"),
        ("Sacred Play Secret Place", " Matryoshka"),
        ("Shape of you", "Ed Sherran"),
        ("Bad Guy", "Billie Elish"),
        ("You are everywhere", "young captain"),
    ]
    async with async_playwright() as playwright:
        await run(playwright, track_infos)

    print(f"finished at: {time.strftime('%X')}")


asyncio.run(crawl())