import { useState } from "react";

const Upload = () => {
    const [isText, setIsText] = useState(false);
    const [isFiles, setIsFiles] = useState(false);

    const [textContent, setTextContent] = useState("");

    return (
        <div className="w-screen h-screen bg-blue-50">
            <div className="text-4xl py-5 text-center font-bold font-sans">
                Upload files
            </div>
            <div className="text-xl py-5 w-3/4 font-sans flex mx-auto text-center">
                Your data will be uploaded anonymously and will be deleted
                automatically after 24 hours
            </div>
            <div className="flex mx-auto w-1/2 flex-col">
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={isText}
                            onChange={(e) => {
                                if (!e.target.checked) {
                                    setTextContent("");
                                }
                                setIsText(e.target.checked);
                            }}
                        />
                        <span className="ml-2">
                            Do you have text content that you want to share?
                        </span>
                    </label>
                </div>
                {isText && (
                    <div className="my-4">
                        <textarea
                            value={textContent}
                            onChange={(e) => setTextContent(e.target.value)}
                            className="form-textarea resize-y border rounded-md w-full max-w-full"
                        />
                    </div>
                )}
                <div>
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            className="form-checkbox text-blue-600"
                            checked={isFiles}
                            onChange={(e) => setIsFiles(e.target.checked)}
                        />
                        <span className="ml-2">
                            Do you have files that you want to share?
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Upload;
