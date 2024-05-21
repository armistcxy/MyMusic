export default function MediaItem() {
    return (
        <div
            onClick={() => { }}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
        >
            <div className="rounded-md h-[48px] w-[48px] overflow-hidden">
                <img src="/data/img/SonTung.jpg" alt="SonTung" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">title</p>
                <p className="text-neutral-400 text-sm truncate">author</p>
            </div>
        </div>
    )
}