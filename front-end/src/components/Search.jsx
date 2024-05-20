import { useStateProvider } from "../utils/StateProvider";
import PopularContent from "./PopularContent";
import SearchContent from "./SearchContent"

export default function Search() {
    const [{ isAuthenticated, isQuery }] = useStateProvider();

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
                    {/* <div className="flex justify-between items-center">
                        <h1 className="text-white text-2xl font-semibold">
                            Recent
                        </h1>
                    </div>
                    <RecentContent /> */}
                    {isQuery ? <div>
                        <div className="flex justify-between items-center pt-6">
                            <h1 className="text-white text-2xl font-semibold">
                                Results
                            </h1>
                        </div>
                        <SearchContent />
                    </div> : <></>}
                    <div className="flex justify-between items-center pt-6">
                        <h1 className="text-white text-2xl font-semibold">
                            Popular
                        </h1>
                    </div>
                    <PopularContent />
                </div>
            ) : (
                <div className="mt-2 mb-7 px-6">
                    {isQuery ? <div>
                        <div className="flex justify-between items-center pt-6">
                            <h1 className="text-white text-2xl font-semibold">
                                Results
                            </h1>
                        </div>
                        <SearchContent />
                    </div> : <></>}
                    <div className="flex justify-between items-center pt-6">
                        <h1 className="text-white text-2xl font-semibold">
                            Popular
                        </h1>
                    </div>
                    <PopularContent />
                </div>
            )}
        </div>
    )
}