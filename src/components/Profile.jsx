import React from "react";

export default function Profile({name,title,image}) {
    return <div className='profile'>
        <img
            className='photo'
            src={image}
             alt="avator"/>
        <h1>{name}</h1>
        <p>{title}</p>
    </div>
}