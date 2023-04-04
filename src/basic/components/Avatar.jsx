import React from "react";

export default function Avatar({image, isNew}) {
    return (
        <div className='avatar'>
            <img
                className='photo'
                src={image}
                alt="avator"/>
            {isNew && <span className='new__clone'>New</span>}
        </div>
    );
}