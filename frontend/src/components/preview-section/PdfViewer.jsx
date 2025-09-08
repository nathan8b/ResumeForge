import { useEffect, useState } from "react";

function PdfViewer({ pdfUrl }) {
    const [backendReady, setBackendReady] = useState(false);

    useEffect(() => {
        const pingBackend = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/health`);
                if(res.ok){
                    setBackendReady(true);
                }
            } catch (err) {
                console.log("Backend still starting, retrying...");
                setTimeout(pingBackend, 3000); // retry in 3s
            }
        };

        pingBackend();
    }, [])

    if(!backendReady) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Waking up server...</p>
                <p>(may take up to a minute)</p>
            </div>
        )
    }

    if(!pdfUrl) {
        return (
            <div className="loading-container">
                <p className="check-mark">✔</p>
                <p>Click Generate to view your resume!</p>
            </div>
        )
    }

    return (
        <iframe src={pdfUrl} title="PDF Viewer"></iframe>
    )
}

export default PdfViewer;