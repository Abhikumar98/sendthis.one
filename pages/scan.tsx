const scan = () => {
    return (
        <div className="w-screen h-screen bg-blue-50">
            <div className="text-4xl py-5 text-center font-bold font-sans">
                Scan code
            </div>
            <div className="text-xl py-5 w-3/4 font-sans flex mx-auto text-center">
                Your data will be uploaded anonymously and will be deleted
                automatically after 24 hours
            </div>
        </div>
    );
};

export default scan;
