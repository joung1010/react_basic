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
  
  
## Immer 라이브러리 사용하기
1. [immer github](https://github.com/immerjs/immer)
2. [immer 공식사이트](https://immerjs.github.io/immer/)  
  
`immer`는 불변성을 유지하는 작업을 간단하게 만들어주는 라이브러리이다.  
이를 용하면 JS의 `Array` 와 `object`와 같은 객체를 수정할 때 새로운 객체를 생성하고 복사하는 것이 아니라,  
기존 객체를 수정하는 방식으로 작업할 수 있다.  
이를 이용해서 `React` 나 `Redux` 같은 라이브러리에서의 상태값을 관리하는 작업을 보다 간단하게 처리할 수 있다.  
  
`immer` 라이브러리의 핵심은 `불변성을 유지하는 작업을 하지만 코드는 변경 가능한 객체를 다루는 것처럼 작성한다`는 것이다.  
예를 들어, JS의 `Array`, `Object`와 같은 객체를 수정할 때,  
일반적으로는 새로운 객체를 생성하고 복사하는 것이 일반적입니다.  
그러나 이 방식은 코드를 복잡하고 성능을 떨어뜨리기 때문에 `immer`는 다르게 접근합니다.  
  
따라서, `immer`는 구조 공유(Structural Sharing)라는 기술을 사용하여 변경이 필요한 객체를 찾고, 이전 객체와 구조를 공유하는 새로운 객체를 만듭니다.  
`immer`는 변경 작업을 수행할 때마다 수정 레코드(Modification Record)라는 것을 생성합니다.  
이는 변경 작업을 수행하는 함수가 반환하는 객체에 저장되며, 이전 객체와의 차이를 나타냅니다.  
수정 레코드는 이전 객체를 참조하는 포인터와 변경 사항을 포함하는 일련의 작업으로 이루어져 있습니다.  
`immer`는 이 정보를 사용하여 새로운 객체를 생성하고, 이전 객체와 구조를 공유합니다.  
  
즉, 객체를 변경할 때 새로운 객체를 생성하지 않고, 이전 객체를 수정하는 방식으로 작업할 수 있습니다.  
이는 코드를 간결하게 만들어주고, 성능도 향상시킬 수 있습니다.  
  
예제 코드  
[use-immer](https://github.com/immerjs/use-immer)
```
import React from "react";
import { useImmer } from "use-immer";


function App() {
  const [person, updatePerson] = useImmer({
    name: "Michel",
    age: 33
  });

  function updateName(name) {
    updatePerson(draft => {
      draft.name = name;
    });
  }

  function becomeOlder() {
    updatePerson(draft => {
      draft.age++;
    });
  }

  return (
    <div className="App">
      <h1>
        Hello {person.name} ({person.age})
      </h1>
      <input
        onChange={e => {
          updateName(e.target.value);
        }}
        value={person.name}
      />
      <br />
      <button onClick={becomeOlder}>Older</button>
    </div>
  );
}
```
  
설치방법  
```
yarn add immer use-immer
yarn add -d immer use-immer (-d 옵션을 주면 개발용 라이브러리 추가 옵션)
```  
  
오류 사항  
```
An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.
```  
에러 이유  
{} 괄호가 없는 화살표 함수는 return 문으로 작동하기 때문에 에러가 발생  
```
// 변경 전
updatePerson(person => person.mentors.push({name, title}));
//변경 후
updatePerson(person => {person.mentors.push({name, title})});
```
  
## Form을 만드는 법
```
import React from "react";

export default function AppForm() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">이름:</label>
            <input type="text" id="name" name="name"/>
            <label htmlFor="email">이메일:</label>
            <input type="email" id="email" name="email"/>
            <button>Submit</button>
        </form>
    );
}
```  
onSubmit 이벤트가 발생할때 `e.preventDefault();` 하는 이유는 해당 이벤트가 발생했을때  
자동적으로 브라우저가 `refresh`되기 때문에 새로고침을 원하지 않으면 `preventDefault()`를 사용하면 된다.  
  
`React`의 철학은 모든 `UI`의 업데이트는 상태의 변경으로부터 발생해야한다.  
예를들어 사용자가 무언가를 클릭했을때 `UI`가 업데이트 되어야만 한다면 `React Component`자체적으로 가지고있는 상태가 변경이 되면서  
`UI`가 업데이트 되어야한다.  
  
하지만, 이런 입력 `Form`은 바로바로 입력을 하면 `UI`상에 즉각적으로 보이는 것을 확인할 수 있다.  
`React`의 상태 값을 업데이트 하지 않았음에도 불구하고 말이다.
![img](../memo/form.png)  
  
이러한 `Component`를 `uncontrolled component`라고한다.  
그래서 이러한 경우에는 입력 `Form`은 `React Component`의 상태와  똑같이 매칭시키는 것이 중요하다.  
```
export default function AppForm() {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">이름:</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => {setName(e.target.value)}}/>
            <label htmlFor="email">이메일:</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            <button>Submit</button>
        </form>
    );
}

```  
개선  
```
export default function AppForm() {
    const [form, setForm] = useState({name:'',email:''});
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm({...form,[name]:value});
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">이름:</label>
            <label htmlFor="email">이메일:</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange}/>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} />
            <button>Submit</button>
        </form>
    );
}
```  
유심해야할 코드 `setForm({...form,[name]:value});`  동적으로 객체에 접근해서 변경된 객체 값만 바꾼다.

이런식으로 `Form`과 `React Component의 state`상태 값을 매핑 시킴으로써 우리가 관리하는 `Component`가 되는 것이다.
