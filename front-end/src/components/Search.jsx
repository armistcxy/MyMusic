import { useStateProvider } from "../utils/StateProvider";
import SearchContent from "./SearchContent"

export default function Search() {
    const [{isAuthenticated}] = useStateProvider();

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
                        <h1 className="text-white text-xl font-semibold">
                            Recent
                        </h1>
                    </div>
                    <SearchContent/>
                    <div className="flex justify-between items-center pt-6">
                        <h1 className="text-white text-xl font-semibold">
                            Results
                        </h1>
                    </div>
                    <SearchContent/>           
                </div>
            ) : (
                <div className="mt-2 mb-7 px-6">
                    <div className="flex justify-between items-center pt-6">
                        <h1 className="text-white text-xl font-semibold">
                            Results
                        </h1>
                    </div>
                    <SearchContent/>           
                </div>
            )}
        </div>
    )
}