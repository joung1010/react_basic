import React from "react";
import NewTag from "./NewTag";

export default function Profile({name, title, image, isNew}) {
    return <div className='profile'>
        <div className='profile__image'>
        {
            isNew && <NewTag/>
        }
            <img
                className='photo'
                src={image}
                alt="avator"/>
        </div>
        <h1>{name}</h1>
        <p>{title}</p>
    </div>
}