import React from "react";
import NewTag from "./NewTag";
import Avatar from "./Avatar";

export default function Profile({name, title, image, isNew}) {
    return <div className='profile'>
        <Avatar
            image={image}
            isNew={isNew}
        />
        <h1>{name}</h1>
        <p>{title}</p>
    </div>
}