/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "../api/axios";
import VideoPlayer from "../components/VideoPlayer";
import { useParams } from "react-router-dom";

function VideoPage() {
    const src = "https://s3.ap-south-1.amazonaws.com/hls.harshmax.dev/videos/index.m3u8";
    const [name, setName] = useState("");
    const { id } = useParams();
    const fetchData = async () => {
        try {
            const result = await axios.post(`/detail`,
                JSON.stringify({
                    id: id,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            setName(result?.data[0]?.title);
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchData();
    }, [])

    console.log(location);
    return (
        <div className="bg-[#000000f3] min-h-screen h-auto flex justify-center items-center">
            <VideoPlayer src={src} name={name}/>
        </div>
    )
}

export default VideoPage