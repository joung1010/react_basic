import React, {useRef} from "react";
import './AppXY.css';

export default function AppXY() {
    const pointRef = useRef();
    const handleMouseMove = (event) => {
        const x = event.pageX;
        const y = event.pageY;
        pointRef.current.style.transform  = `translate(${x}px,${y}px)`;
    }
    return (
        <div className='container' onMouseMove={handleMouseMove}>
            <div className='pointer' ref={pointRef}/>
        </div>
    );
}