import React from "react";
import NewTag from "./NewTag";

export default function Profile({name, title, image, isNew}) {
    return <div className='profile'>
            <img
                className='photo'
                src={image}
                alt="avator"/>
        {isNew && <span className='new__clone'>New</span>}
        <h1>{name}</h1>
        <p>{title}</p>
    </div>
}