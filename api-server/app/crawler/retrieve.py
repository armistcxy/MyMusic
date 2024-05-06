import pandas as pd
import os
from pathlib import Path


def retrieve_kpop_song():
    relative_path = "app/crawler/kpop.csv"
    base_path = Path.cwd()
    absolute_path = os.path.join(base_path, relative_path)

    df = pd.read_csv(absolute_path)
    cols = df.columns
    rename_cols = [
        "1",
        "image_path",
        "spotify_track_url",
        "track_name",
        "artist",
        "spotify_artist_url",
        "album_name",
        "spotify_album_url",
        "2",
        "song_length",
    ]
    # for i in range(len(cols)):
    #     print(cols[i], rename_cols[i])
    df.rename(
        columns={col: rename_col for col, rename_col in zip(cols, rename_cols)},
        inplace=True,
    )

    print(df.iloc[139])
    df.to_csv("song.csv")


retrieve_kpop_song()
