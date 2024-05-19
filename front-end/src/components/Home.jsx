import { useEffect } from "react"
import HomeContent from "./HomeContent"
import { useStateProvider } from "../utils/StateProvider";

export default function Home() {
    const [{ token, newestSongs }, dispatch] = useStateProvider();
    useEffect(() => {
        console.log("at home");
        console.log(dispatch);
    }, [token, dispatch])
    return (
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hiden
            overflow-y-auto"
            >
            <div className="mt-2 mb-7 px-6">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">
                        Newest Songs
                    </h1>
                </div>
                <HomeContent />
            </div>
        </div>
    )
}