import { useStateProvider } from "../utils/StateProvider"

export default function PlaylistItem({ data }) {
    const [{ userInfo }] = useStateProvider();

    return (
        <div
            onClick={() => { }}
            className="
            relative
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
                    className="object-cover w-full h-full"
                    src={`https://www.gravatar.com/avatar/${data.id.replace(/-/g, "")}?s=64&d=identicon&r=PG`}
                    alt={data.name}>
                </img>
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="text-neutral-100 text-lg font-semibold truncate w-full">{data.name}</p>
                <p className="text-neutral-400 text-smpb-4 w-full truncate">By {userInfo?.username}</p>
            </div>
        </div>
    )
}