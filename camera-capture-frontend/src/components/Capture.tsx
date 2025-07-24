import React, {useRef, useEffect, useState} from "react";

export default function Capture() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    //const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [streaming, setStreaming] = useState(false);
    const [paused, setPaused] = useState(false);
    const constraints = {
        video: {
        width: 640,
        height: 640,
        facingMode: "environment",
        }
    };

    useEffect(() => {
        const startVideo = async () => {
            try {
                const stream:MediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setStreaming(true);
            } catch (error) {
                console.error("Error accessing webcam:", error);
            }
        };

        startVideo();

        return () => {
            if (videoRef.current?.srcObject) {
                const stream:MediaStream = videoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    const handleSnapshot = () => {
        const video:HTMLVideoElement | null = videoRef.current;
        //const canvas:HTMLCanvasElement | null = canvasRef.current;
        if (!video) {
            return;
        }
        // canvas.width = video.videoWidth;
        // canvas.height = video.videoHeight;
        // canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
        video.pause();
        setPaused(true);
    };

    const handleResume = () => {
        videoRef.current?.play();
        setPaused(false);
    }

    return (
        <div>
            <video ref={videoRef} autoPlay muted playsInline style={{width: "100%", maxWidth: 640}}/>
            {/* <canvas ref={canvasRef} style={{display: "block", marginTop: 10}}/> */}
            <div style={{marginTop: 10}}>
                {!paused ? (
                    <button onClick={handleSnapshot}>Take Snapshot</button>
                ) : (
                    <button onClick={handleResume}>Resume Video</button>
                )}
            </div>
        </div>
    );
}