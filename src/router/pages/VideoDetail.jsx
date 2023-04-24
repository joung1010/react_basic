import React from 'react';
import {useParams} from 'react-router-dom';
function VideoDetail(props) {
    const {videoId} = useParams();
    return (
        <div>VideoDetails: {videoId}</div>
    );
}

export default VideoDetail;