#React Router

## CSR에 대해 정리  
### 라우팅(Routing) 이란?
네트워크에서 데이터 패킷을 출발지에서 목적지까지 전달하기 위해 경로를 결정하는 과정을 말합니다.  
즉, 우리가 브라우저 주소창에다가 `URL`를 입력했을때 서버에서 요청된 `URL`에 해당하는 데이터를 전달해 주는 것을 말한다.  
  
  
### Client side Routing 이란  
웹 애플리케이션에서 브라우저 측에서 라우팅을 처리하는 방식입니다.  
전통적인 서버 사이드 라우팅(Server-side Routing) 방식에서는 서버가 클라이언트의 요청에 대한 응답으로 HTML 페이지 전체를 다시 로드하고 렌더링한다.  
하지만 클라이언트 사이드 라우팅에서는 페이지 전체를 다시 로드하지 않고,  
필요한 데이터만 서버로부터 요청하여 받아와서 화면을 업데이트합니다.  

클라이언트 사이드 라우팅은 브라우저의 JavaScript 엔진을 이용하여 동적으로 웹 페이지를 렌더링하며,  
이를 가능하게 하는 라이브러리나 프레임워크가 있다.(React,Angular, Vue)  
  
즉, 페이지 전체를 유지하면서 원하는 부분만 네트워크 통신을 통해 업데이트 한다.  
그래서 `React Router`를 이용하면 `SPA`를 유지하면서 멀티페이지의 장점을 그대로 유지할 수 있다.  

## 새로운 라이브러리를 공부하는 방법
어떤 라이브러리를 공부하던 먼저 공식사이트를 먼저 확인하는 습관이 중요하다.  
특히 `React Router`처럼 버전 업데이트가 빈번하게 발생하는 라이브러리라면 더더욱 공식사이트가 중요하다.

공식 사이트에서 먼저 확인해야 할것들은?
1. Homage 소개 페이지 -> 해당 라이브러리의 큰그림을 이해할 수 있다.
    1. 내가 사용할 라이브러리가 어떤 문제를 해결하기위해서 만들어진 것인지
    2. 해당 라이브러리의 장점은 무엇인지
    3. 어떤 상황에서 사용해야 하는 건지?
    4. 사용했을때의 이점은 무엇인지?
2. Getting started 페이지를 훑어보자 -> 빠르게 기능파악
    1. 설치방법
    2. 사용방법
    3. 사용예제
3. 프로젝트 -> 실전 프로젝트를 통해 사용법 숙지
    1. 사용 예제
    2. 공식 문서 확인

## 사용 예제
설치
```
yarn add react-router-dom
```

```
import React from 'react';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';

const router = createBrowserRouter([{
    path:'/',
    element: <p>Home</p>,
    errorElement:<p>Not Found</p>
},{
    path:'/videos',
    element: <p>Videos</p>
}


])

export default function App(props) {
    return (
        <RouterProvider router={router}/>

    );
}

```
  

