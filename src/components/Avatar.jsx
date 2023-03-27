import React from "react";

export default function Avatar({image,classNm}) {
    return (
        <img
            className={classNm}
            src={image}
            alt="avator"/>
    );
}