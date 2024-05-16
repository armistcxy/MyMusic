import PlayButton from "./PlayButton"

export default function SongItem() {
    return (
        <div
        onClick={() => {}}
        className="relative
        group
        flex
        flex-col
        items-center
        justify-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-400/5
        cursor-pointer
        hover:bg-neutral-400/10
        transition
        p-3">
            <div className="
                relative
                aspect-square
                w-full
                h-full
                rounded-md
                overflow-hidden">
                <img
                className="object-cover"
                src="/data/img/SonTung.jpg"
                alt="SonTung">
                </img>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-neutral-100 text-lg font-semibold truncate w-full">title</p>
                <p className="text-neutral-400 text-smpb-4 w-full truncate">by</p>
                <div className="
                absolute
                bottom-24
                right-5">
                    <PlayButton></PlayButton>
                </div>
            </div>
        </div>
    )
}