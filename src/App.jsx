import React from 'react';
import Button1 from "./css/components/Button1";
import Button2 from "./css/components/Button2";
import styled, {css} from "styled-components";
import StyledComponents from "./css/StyledComponents";
import TailwindComponent from "./css/TailwindComponent";




export default function App(props) {
    return (
        <>
            <Button1/>
            <Button2/>
            <StyledComponents/>
            <TailwindComponent/>
        </>
    );
}
