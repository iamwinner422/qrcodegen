import './App.css'
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useRef, useState} from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import changeLinkToName from "@/utils/changeLinkToName.js";

function App() {
    const [url, setUrl] = useState("");
    const [qrIsVisible, setQrIsVisible] = useState(false);
    const [isError, setIsError] = useState(false);
    const qrCodeRef = useRef(null);

    const handleGenerateClick =  () => {
        if (url === "") {
            setIsError(true);
            setQrIsVisible(false);
        }else{
            setIsError(false);
            setQrIsVisible(true);
        }
    }

    const downloadQRCode = () => {
        htmlToImage.toPng(qrCodeRef.current)
            .then(function (dataUrl) {
                const link = document.createElement("a");
                link.href = dataUrl;
                link.download = `${changeLinkToName(url)}.png`;
                link.click();
            })
            .catch(function (error) {
                console.error("Error generating QR code:", error);
            });
    };

    return (
        <div className="bg-white w-full dark:bg-zinc-950 h-screen dark:text-white md:flex">
            <div className="md:w-1/2 w-full pt-10 md:pt-0 border-r dark:border-zinc-700">
                <div className="w-full h-full flex justify-center items-center">
                    <div className="flex-col flex space-y-8">
                        <Label className="text-3xl text-center">Cover Plate QR Code Generator</Label>
                        <div className="flex-col flex items-center justify-center space-y-4 px-5 md:px-0">
                            <Input className={isError ? "border border-red-500 ring-red-500" : ""} required value={url} onChange={(e) => setUrl(e.target.value)} type="text" placeholder="Enter a URL"/>
                            <Button onClick={handleGenerateClick} className="w-48 flex gap-x-2">Generate</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 w-full pt-16 md:pt-0">
                <div className="w-full h-full flex justify-center items-center">
                    <div>
                        {qrIsVisible && (
                            <div className="flex-col flex items-center justify-center md:space-y-5">
                                <QRCode value={url}  className="md:w-72 w-56" ref={qrCodeRef}/>
                                <Button onClick={downloadQRCode} className="w-48 flex gap-x-2">Download</Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
