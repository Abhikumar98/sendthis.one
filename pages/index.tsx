import Link from "next/link";

const Home = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center font-sans">
            <Link href="/upload">
                <div className="w-1/2 h-screen bg-blue-500 flex justify-center items-center text-white font-bold text-4xl cursor-pointer hover:bg-blue-400">
                    Share
                </div>
            </Link>
            <Link href="/scan">
                <div className="w-1/2 h-screen bg-yellow-400 flex justify-center items-center text-white font-bold text-4xl cursor-pointer hover:bg-yellow-300">
                    Scan
                </div>
            </Link>
        </div>
    );
};

export default Home;
