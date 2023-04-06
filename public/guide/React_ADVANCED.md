# 심화

## 마우스 따라가기

```
import React, {useRef, useState} from "react";
import './AppXY.css';

export default function App() {
    return (
        <div className='container' onPointerMove={handlePointMove}>
            <div className='pointer' style={{transform: `translate(${x}px,${y}px)`}}/>
        </div>
    );
}
```

리엑트의 개념이 중요하기 보다는 Browser 에 관련된 Event 처리가 중요하다.  
`onPointerMove`이벤트를 통해서 이벤트를 등록한다.  
이때 `point`가 움직일때마다 변경되는 `x`, `y` 좌표를 받아서 컴포넌트의 `state` 값을 변경하고 그 변경값을 `style translate`를 이용해서 변경하면 될것 같다.

```
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
  
    const handlePointMove = (e) => {
        setX(e.clientX);
        setY(e.clientY);
    }
    return (
        <div className='container' onPointerMove={handlePointMove}>
            <div className='pointer' style={{transform: `translate(${x}px,${y}px)`}}/>
        </div>
    );
```

현 코드에서 개선할 점은 더 없는 것일까??  
일단 먼저 `state`값인 `x`와 `y`가 개별적으로 존재하고 있고  
업데이트 할때도 `setX`, `setY`도 마찬가지이다.  
이대로 작성해도 상관은 없지만 `좌표`라는 연관된 데이터임에도 불구하고 상태를 따로 관리하고 있다.  
위와 같이 연관있는 데이터는 `React`에서도 객체로 관리하는 것이 좋다.

물론 최신 `React`에서는 하나의 `callback`함수내에서 `set`을 여러번 하면  `React`에서 이 여러번의 `set`을 한번에 묶어서 동시에 `update`한다.  
즉, `React`에서 하나의 콜백안에서 여러개의 `set`으로 상태를 `update`하고 그것을 전부 묶어서 `Virtual DOM`을 만들어서 브라우저에 효율적으로 업데이트한다. 하지만 이것도 100퍼센트
보장해주는 것은 아니다.(비동기를 이용해서 여러군데에서 `set`을 호출했을때)  
객체로 관리

```
export default function App() {
    const [position, setPosition] = useState({x: 0, y: 0});


    const handlePointMove = (e) => {
        setPosition({x:e.clientX, y: e.clientY});
    }
    return (
        <div className='container' onPointerMove={handlePointMove}>
            <div className='pointer' style={{transform: `translate(${position.x}px,${position.y}px)`}}/>
        </div>
    );
};
```

## 이중 구조분해할당(nested destructuring)

내코드

```
    const [person, setPerson] = useState({
        name: '박정환',
        title: '개발자',
        mentor:{
            name:'밥',
            title : '시니어개발자',
        },
    });
    
 const name = prompt(`what's your mentor's name?`);
                setPerson((pre) => {
                    const {name: myName, title: myTitle, mentor: {name: mentorName, title: mentorTitle}} = pre;
                    return {
                        name: myName,
                        title: myTitle,
                        mentor: {
                            name: name,
                            title: mentorTitle
                        },
                    };
                });    
```
개선하기  
```
const name = prompt(`what's your mentor's name?`);
setPerson((person) => ({...person,mentor:{...person.mentor,name}}));

```

