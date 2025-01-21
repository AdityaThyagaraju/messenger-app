// import React, { useEffect, useRef, useState } from "react";

// const VideoCall = () => {
//     const [localVideoSrc, setLocalVideoSrc] = useState(null);
//     const [mute, setMute] = useState(false);
//     const [playVideo, setPlayVideo] = useState(true);
//     const localVideoRef = useRef(null);

//     const startLocalVideo = async (constraints) => {
//         try {
//             const stream = await navigator.mediaDevices.getUserMedia(constraints);
//             console.log("Got MediaStream:", stream);
//             setLocalVideoSrc(stream);
//         } catch (error) {
//             console.error("Error opening video camera.", error);
//         }
//     };

//     const toggleStream = (media)=>{
//         const stream  = localVideoSrc.getTracks();
//         stream.forEach(element => {
//             if(element.kind == media){
//                 if(media=="video"){
//                     element.enabled=!playVideo;
//                     setPlayVideo(!playVideo);
//                 }
//                 else{
//                     element.enabled=mute;
//                     setMute(!mute);
//                 }
//             }
//         });
//     }
    
//     useEffect(() => {
//         if(!localVideoSrc)
//             startLocalVideo({ video: true, audio: true });
//         localVideoRef.current.srcObject = localVideoSrc;
//     }, [localVideoSrc]);

//     return (
//         <>
//             <h1>Video Call</h1>
//             <video
//                 height={100}
//                 width={200}
//                 ref={localVideoRef}
//                 autoPlay
//             />
//             <button onClick={(e)=>toggleStream("audio")} >{mute?"unmute":"mute"}</button>
//             <br />
//             <button onClick={(e)=>toggleStream("video")} >{playVideo?"pause":"play"}</button>
//         </>
//     );
// };

// export default VideoCall;
import React, { useEffect, useRef, useState } from "react";

const VideoCall = () => {
    const [localVideoSrc, setLocalVideoSrc] = useState(null);
    const [mute, setMute] = useState(false);
    const [playVideo, setPlayVideo] = useState(true);
    const localVideoRef = useRef(null);

    const startLocalVideo = async (constraints) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log("Got MediaStream:", stream);
            setLocalVideoSrc(stream);
        } catch (error) {
            console.error("Error opening video camera.", error);
        }
    };

    const toggleStream = (media) => {
        const stream = localVideoSrc.getTracks();
        stream.forEach((element) => {
            if (element.kind === media) {
                if (media === "video") {
                    element.enabled = !playVideo;
                    setPlayVideo(!playVideo);
                } else {
                    element.enabled = mute;
                    setMute(!mute);
                }
            }
        });
    };

    useEffect(() => {
        if (!localVideoSrc) startLocalVideo({ video: true, audio: true });
        if (localVideoRef.current) localVideoRef.current.srcObject = localVideoSrc;
    }, [localVideoSrc]);

    return (
        <div className="flex flex-col items-center pt-3 bg-slate-950 min-h-screen text-white">
            <h1 className="text-3xl font-bold mb-6">Video Call</h1>
            <div className="w-3/5 aspect-video rounded-sm overflow-hidden shadow-md bg-slate-950">
                <video 
                    ref={localVideoRef} 
                    autoPlay 
                    muted 
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="w-full absolute bottom-0 p-2 flex space-x-4 justify-center backdrop-blur-lg bg-opacity-10 bg-gray-500">
                <button 
                    onClick={() => toggleStream("audio")} 
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-800 rounded-sm shadow hover:bg-slate-900 focus:ring-2 focus:ring-slate-300 transition-transform transform"
                >
                    {mute ? "Unmute" : "Mute"}
                </button>
                <button 
                    onClick={() => toggleStream("video")} 
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-slate-800 rounded-sm shadow hover:bg-slate-900 focus:ring-2 focus:ring-slate-300 transition-transform transform"
                >
                    {playVideo ? "Pause" : "Play"}
                </button>
            </div>
        </div>
    );
};

export default VideoCall;
