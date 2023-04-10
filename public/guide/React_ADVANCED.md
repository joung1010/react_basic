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

## 이중 구조분해할당(심화)
내코드
```
    const [person, setPerson] = useState({
        name: '박정환',
        title: '개발자',
        mentors:[
            {
                name:'밥',
                title : '시니어개발자',
            },
            {
                name:'제임스',
                title : '시니어개발자',
            },
        ]
    });
    
  const pre = prompt(`누구의 이름을 바꾸고 싶은가요?`);
                    const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
                    setPerson((person) => ({...person
                        ,mentors: person.mentors.map((mentor) => {
                            if (mentor.name === pre) {
                                return {...mentor, name: current};
                            } 
                            return mentor;
                        })
                    }));    
```

근데 왜 `React`에서 상태(state)값을 이렇게 복잡하게 변경해야만 할까??  
왜 기존의 배열에서 수정하는 것이 아니로 `map` API 를 이용해서 새로운 배열을 생성해서 변경하는 것일까?  
왜 기존 객체에서 수정하지 않고 새로운 객체를 만들어서 수정할까?  
  
그 이유는 원칙적으로 `React`에서 가지고 있는 이 `state`(상태) 값은 불변성을 유지해야 한다.  
만약 변경해야 된다면 새로운 값, 새로운 객체, 새로운 배열로 만들어 주어야 한다.  
만약 새로운 값을 만들어 주지 않으면 `React`는 `render()`함수를 호출 하지 않는다.  
  

객체를 만들게 되면 객체 마다 고유한 참조값이 만들어 지게 된다.  
`React`는 이렇게 새로운 참조값이 만들어 져야만 어떤 값이 변경되었다는 것을 감지할 수 있다.  
따라서 참조값이 동일한 객체에서 아무리 안의 내용을 변경하더라도 `React`입장에서는 동일한 객체이기때문에 업데이트 하지 않는다.  
즉, `UI`를 업데이트 하고싶으면 새로운 객체를 만들어서 새로운 참조값을 가질 수 있게 해주어야 한다.  
  
## 상태관리 라이브러리
`React`에서 `useState`를 이용해서 상태를 관리할 수 있다.  
이떄 사용하는 상태는 읽기 전용이기 때문에 불변성을 유지해야 한다.  
따라서 만약 중첩 객체에서 가장 말단에 있는 값을 변경해야만 한다면  
기존 상태는 유지한채로 새로운 객체를 생성하여 기존 값을 똑같이 복사하고 변경이 필요한 부분만 변경한다.  
따라서 이러한 중첩 객체와 같은 경우 코드가 필연적으로 길어질 수 밖에 없다.  
  
이러한 상태를 좀더 쉽게 도와주는 라이브러리가 존재한다.  
* Redux 
* Mobx
* Immer
* 기타등등
  
하지만, 최신 `React`에서는 `React Hook` `useState`을 이용해서 충분히 상태관리를 할 수 있고  
상태를 관리하는 코드(새롭게 객체를 생성, 변경, 삭제등)들을 재사용하고 싶다면 `useReducer`를 사용할 수도 있다.  
또한, 다수의 여러개의 `Component`의 상태를 관리하고 싶다면 `context api` 를 이용해서 관리 할 수 있다.  
  
## useReducer  
기존에 사용했던 상태를 업데이트 하는 로직을 다른 `component`에서 재사용하고싶다.  
기존의 상태코드를 관리하는 코드들 한곳에 묶어두고 `useState`대신 `useReducer`를 사용할 수 있다.
```
    const handleUpdate = () => {
        const pre = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        setPerson((person) => ({
            ...person
            , mentors: person.mentors.map((mentor) => {
                if (mentor.name === pre) {
                    return {...mentor, name: current};
                }
                return mentor;

            })
        }));
    }
    const handleAdd = () => {
        const name = prompt(`추가할 멘토의 이름을 입력해주세요.`);
        const title = prompt(`추가할 멘토의 타이틀을 입력해주세요.`);
        setPerson((people) => ({
                ...people
                , mentors: [...people.mentors
                    , {name, title}]
            })
        );
    };
    const handleDelete = () => {
        const name = prompt(`삭제할 멘토이름을 입력하세요`);
        setPerson((person) => ({
            ...person,
            mentors: person.mentors.filter((mentor) => mentor.name !== name)
        }))
    };
```
이떄 `useReducer`을 사용할 수 있다.
```
function personReducer(person, action) {
    switch (action.type) {
        case 'updated': {
            const {prev, curr} = action;
            return {
                ...person
                , mentors: person.mentors.map((mentor) => {
                    if (mentor.name === prev) {
                        return {...mentor, name: curr};
                    }
                    return mentor;
                })
            };
        }
        case 'added':{
            const {name, title} = action;
            return {
                ...person
                , mentors: [...person.mentors
                    , {name, title}]
            };
        }
        case 'deleted':{
            const {name} = action;
            return {
                ...person,
                mentors: person.mentors.filter((mentor) => mentor.name !== name)
            };
        }
        default : {
            throw Error(`알수없는 action type 이다: ${action.type}`);
        }
    }
}

```
```
const [person, dispatch] = useReducer(personReducer,initialPerson);
```  
`useState`와 유사하지만 `useReducer`는 첫번째 인자로 우리가 `새롭게 객체를 만들어 나갈 함수`를 전달해주고  
두번째 인자로 `상태의 초기값`을 전달해 주면 된다.  
  
결과 값으로는 `state` 와 우리가 인자로 전달한 함수를 호출할 수 있는`dispatch`함수를 반환 받는다.  
`useState` 에서 `setPerson`으로 상태 값을 `update`한 것처럼 `dispatch`를 통해서 우리가 원하는 `action`을 명령할 수 있다.  
  
예제
```
    const handleUpdate = () => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const curr = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        dispatch({type:'updated',prev:prev,curr})
    }
```  
위와 같이 `dispatch` 함수의 인자로 `action`객체를 전달해주면  
`dispatch`가 호출되면서 `useReducer`가 자동으로 우리가 전달한 함수(personReducer)를 호출해준다.  
이때 기존의 `person`객체와 `dispatch`에 전달한 `action`객체를 `personReducer`함수에 전달해준다.