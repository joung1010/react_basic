import React from 'react';
import Button1 from "./css/components/Button1";
import Button2 from "./css/components/Button2";
import styled, {css} from "styled-components";


const Container = styled.div`
    display:flex;
`;
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #3c5b69;
  color: #b9eaff;
  margin: 0 1em;
  padding: 0.25em 1em;
  height:50px;
  ${(props) =>
    props.primary &&
    css`
      background: #009cd5;
      color: white;
    `};
`;


export default function App(props) {
    return (
        <>
            <Button1/>
            <Button2/>

            <Container>
                <Button>Normal Button</Button>
                <Button primary>Primary Button</Button>
            </Container>
        </>
    );
}
