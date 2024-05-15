import About from "./About"
import PageContent from "./PageContent"

export default function Home() {
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
                <PageContent/>
                <About></About>
            </div>
        </div>
    )
}