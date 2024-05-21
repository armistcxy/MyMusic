import { useStateProvider } from "../utils/StateProvider"
import PlaylistContent from "./PlaylistContent"

export default function Library() {
    const [{ isAuthenticated }] = useStateProvider();

    return (
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hiden
            overflow-y-auto">
            {isAuthenticated ? (
                <div className="mt-2 mb-7 px-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-2xl font-semibold">
                            Playlist
                        </h1>
                    </div>
                    <div>
                        <PlaylistContent />
                    </div>
                </div>
            ) : (
                <div className="mt-2 mb-7 px-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-white text-2xl font-semibold">
                            Log in to enjoy your Playlist!
                        </h1>
                    </div>
                </div>
            )}
        </div>
    )
}