/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-inner-declarations */
import React, { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';
import leftArrow from '../assets/left.png';

const HLSPlayer = ({src,name}) => {
    const [player, setPlayer] = React.useState(null);
    const videoRef = useRef(null);

    const optionsforMobile = [
        'play-large',
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'settings',
        'fullscreen',
    ]

    useEffect(() => {
        const loadPlayer = () => {
            const video = videoRef.current;
            const source = src;
            const defaultOptions = {};

            if (window.Hls && window.Plyr && video) {
                const hls = new window.Hls();

                hls.loadSource(source);
                hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
                    const availableQualities = hls.levels.map((l) => l.height);
                    defaultOptions.controls = optionsforMobile;
                    defaultOptions.quality = {
                        default: availableQualities[0],
                        options: availableQualities,
                        forced: true,
                        onChange: (e) => updateQuality(e)
                    };
                    defaultOptions.speed = {
                        selected: 1,
                        options: [0.25, 0.5, 1, 1.5, 2]
                    };
                    setPlayer(new window.Plyr(video, defaultOptions));
                });
                hls.attachMedia(video);
                window.hls = hls;

                const handleKeyDown = (e) => {
                    if (e.key === " ") {
                        e.preventDefault();
                        player.togglePlay();
                    }
                    if (e.key === "ArrowRight") {
                        player.forward();
                    }
                    if (e.key === "ArrowLeft") {
                        player.rewind();
                    }
                    if (e.key === ">" && player.speed < 2) {
                        player.speed = player.speed + 0.25;
                    }
                    if (e.key === "<" && player.speed > 0.25) {
                        player.speed = player.speed - 0.25;
                    }
                };

                document.addEventListener("keydown", handleKeyDown);

                // Cleanup function to remove event listener
                return () => {
                    document.removeEventListener("keydown", handleKeyDown);
                };

                function updateQuality(newQuality) {
                    window.hls.levels.forEach((level, levelIndex) => {
                        if (level.height === newQuality) {
                            window.hls.currentLevel = levelIndex;
                        }
                    });
                }
            }
        };

        const scriptHls = document.createElement('script');
        const scriptPlyr = document.createElement('script');

        scriptHls.src = "https://cdn.jsdelivr.net/npm/hls.js@1";
        scriptPlyr.src = "https://cdn.plyr.io/3.7.8/plyr.js";

        document.body.appendChild(scriptHls);
        document.body.appendChild(scriptPlyr);

        scriptHls.onload = () => {
            scriptPlyr.onload = loadPlayer;
        };

        var x;
        setTimeout(() => {
            if (window.hls === undefined || window.Plyr === undefined) {
                x = setTimeout(() => {
                    window.location.reload();
                }, 300)
            }
        }, 500)

        // Cleanup function to remove scripts
        return () => {
            document.body.removeChild(scriptHls);
            document.body.removeChild(scriptPlyr);
            clearTimeout(x);
        };
    }, []);

    const [mouseMove, setMouseMove] = React.useState(false);

    useEffect(() => {
        setMouseMove(true);
        let timeout;
        timeout = setTimeout(() => {
            setMouseMove(false);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        }
    },[])

    document.onmousemove = () => {
        if(mouseMove){
            return;
        }
        setMouseMove(true);
        let timeout;
        timeout = setTimeout(() => {
            setMouseMove(false);
        }, 3000);
        return () => {
            clearTimeout(timeout);
        }
    }

    return (
        <div className={`max-h-screen w-full object-contain`}>
            <div className={`absolute text-white z-[990] top-0 w-full h-[30%] flex justify-center items-center text-4xl font-semibold bg-[skyblue] fade-overlay-down pointer-events-none duration-200 ${!mouseMove?"translate-y-[-100%]":""}`}></div>
            <div className={`absolute top-0 z-[1001] text-white h-[20%] w-full flex justify-start items-center pl-[8%] text-4xl duration-200 ${!mouseMove?"translate-y-[-100%]":""}`}>
                <button onClick={()=>{
                    window.history.back();
                }} className='h-[25px] flex justify-center items-center gap-2 cursor-pointer'>
                    <img className='h-full w-full pt-[0.25rem]' src={leftArrow}/>
                    Back
                </button>
            </div>
            <div className={`absolute text-white z-[1000] top-0 w-full h-[20%] flex justify-center items-center text-4xl font-semibold duration-200 ${!mouseMove?"translate-y-[-100%]":""}`}>{name}</div>
            <video ref={videoRef} className={`max-h-screen w-full`} id="player" controls></video>
        </div>
    );
};

export default HLSPlayer;
