/* eslint-disable react/prop-types */
import React, { Suspense } from 'react'
const VideoPlayerDesktop = React.lazy(() => import('./VideoPlayerDesktop'))
const VideoPlayerMobile = React.lazy(() => import('./VideoPlayerMobile'))

function VideoPlayer({src,name}) {
    const [isMobile, setIsMobile] = React.useState(false);
    const [varMob, setVarMob] = React.useState(false);

    React.useEffect(() => {
        setVarMob(window.matchMedia("(max-width: 768px)").matches);
    }, [])
    
    React.useEffect(() => {
        setIsMobile(varMob);
    }, [varMob])

    return (
        isMobile ? 
        <Suspense>
            <VideoPlayerMobile src={src} name={name}/> 
        </Suspense>
        :
        <Suspense>
            <VideoPlayerDesktop src={src} name={name}/>
        </Suspense>
    )
}

export default VideoPlayer