import PageContent from "./PageContent"

export default function Home() {
    return (
        <div className="
            bg-neutral-900
            rounded-lg
            h-full
            w-full
            overflow-hiden
            overflow-y-auto">
            <div className="mt-2 mb-7 px-6">
            <div className="flex justify-between items-center">
                <h1 className="text-white text-2xl font-semibold">
                        Search
                    </h1>
                </div>
                <div>
                    <PageContent/>
                </div>
            </div>
        </div>
    )
}