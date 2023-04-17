# 심화2
## 컴포넌트 재사용(High Order Component)
```
import React from "react";
import Avatar from "./basic/components/Avatar";

export default function AppWrap() {
    return (
        <div>
            <Navbar/>
        </div>
    );
};
```
```
export default function Navbar() {
    return (
        <header style={{backgroundColor: 'yellow'}}>
            <Avatar
                image='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80'
                name='bob'
                size={200}
            />
        </header>
    );
}
```
```

export default function Avatar({image,name, size}) {
    return (
      <div>
          <img
              src={image}
              alt={`${name}`}
              width={size}
              height={size}
              style={{borderRadius:'50%'}}
          />
      </div>
    );
}
```
이렇게 3개의 `component`가 있는데 만약 `Navbar Component`를 다른곳에서 사용할때  
특정 문구를 추가하고 싶을때 예를 들어 `<p>안녕</p>`과같은 문구를 추가하고 싶다면 어떻게할까??  
즉, `Navbar`안에` <header style={{backgroundColor: 'yellow'}}>`는 `header`태그 안에 있는 내용만 변경하고 싶다.  
이런 측면에서 볼때는 재사용성이 떨어진다고 볼 수 있다.

이럴때 유용하게 사용할 수 있는 것이 `WrapComponent` 또는 `High Order Component`라고도 한다.
```
export default function AppWrap() {
    return (
        <div>
            <Navbar>
                <Avatar
                    image='https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80'
                    name='bob'
                    size={200}
                />
            </Navbar>
        </div>
    );
};

```
```
export default function Navbar({children}) {
    return (
        <header style={{backgroundColor: 'yellow'}}>{children}</header>
    );
}
```

위에 코드처럼 `React`에서는 `<Navbar> Component` 사이에 (`<Navbar> </Navbar>`) 사용하는 태그요소들이  
자동으로 `children`이라는 이름의 `prop`으로 전달해준다.  
  
## Context
`React`의 `Context API`는 부모 컴포넌트에서 자식 컴포넌트로 데이터를 전달하기 위한 방법을 제공한다.  
그렇다면 `React`에서는 `props`를 사용하여 부모 `Component`에서 자식 `Component`로 데이터를 전달하는 방법과는 무슨 차이가 있을까??  
  
먼저 `props`를 계속해서 전달하는 것이 번거로울 수 있다. 또한, 컴포넌트 트리의 깊은 곳에 위치한 자식 컴포넌트에게 데이터를 전달하는 것은 더욱 어렵습니다.  
이때 `Context API`를 사용하면 컴포넌트 트리 전체에서 전역적으로 데이터를 공유할 수 있다.  
즉, 부모 컴포넌트에서 생성한 데이터를, 자식 컴포넌트에서 직접적으로 접근하여 사용할 수 있다.  
  
모든 컴포넌트들이 필요하다면 어플리케이션 전박ㅈ3ㅓ으로 필요한경우 `Context API`를 사용할 수 있다.  
예를 들어 언어, 테마(다크모드),로그인 정보 등이 있다.  
주의사항으로는 `Context API`를 사용하는 곳에서 데이터 변경이 발생하면 예를들어 사용자가 언어를 변경하고, 테마나 로그인 로그아웃을 한다면  
`Context API`를 사용하는 모든 자식 `Component`들은 모두 상태가 변경된 것이기 때문에 모두 다시 `render`된다.   
따라서 빈번히 업데이트 되는 `상태`는 가급적 사용하지 않거나 `umbrella technique`을 사용하는 것이 좋다.
   
### umbrella technique
`Context API`를 컴포넌트 전체에 사용할 수도 있지만  
우리가 원하는 `Component Tree`중간에 사용할 수 있다.  
이런 방식으로 `Component`전체에 `Context API`를 사용하는 것이 아니라  
정말 필요한 곳의 근접한 부모 `Component`에서 사용하면 좀더 성능적으로 유용하다.  
그래서 내가 사용하는 데이터가 어디까지 공유되어야 하는지 잘 파악해서  
`테마` 나 `로그인` 같은 정보는 전체적으로 모든 `Component`에서 `Context API`를 사용하고  
어느 특정 `Component`들 사이의 데이터를 공유해야한다면(빈번이 변경) 꼭 필요한 부분에만 `Context API`를 적용하면 된다.  

### 사용법
`React`에서 `Context API`를 사용하려면 `React.createContext`메소드를 이용해서 `Context` 객체를 생성한 후  
`Context.Provider` 컴포넌트를 사용하여 전달할 데이터를 감싸고, 하위 `Component`에게 전달할 수 있다.
  
조금더 쉽게 생각해 보자면  
`Context` 객체가 우리가 필요한 데이터를 담고 있을 것이다.  
이 `Provider`는 가지고 있는 데이터를 가지고 우산처럼 쫙 펼처서 어느 자식 `Component` 까지 영향을 줄지를 결정한다.
  
```
import {createContext} from "react";

export const DarkModeContext = createContext();

export function DarkModeProvider({children}) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(mode => !mode);
    
    return (
      <DarkModeContext.Provider>
          {children}
      </DarkModeContext.Provider>  
    );
}
```  
이 `Provider`는 일반 `Component`와 똑같은데 외부에서 `Component`를 받을 수 있는 `Component`이다  
그래서 이 `Provider Component`는 UI 적으로 어떤 동작을 하지 않지만 전달받은 `Component`를 감싸는 역할을 한다.  
따라서 우리가 전달받은 자식 `Component`에 `Provider`가 가지고 있는 상태를 전달하고 싶다면  `value` `props`에 값을 전달해주면 된다.  

```
      <DarkModeContext.Provider
        value={{darkMode, toggleDarkMode}}
      >
          {children}
      </DarkModeContext.Provider>
```
  
이렇게 필요한 부분에 우산을 씌워주면 된다.  
그럼 우산을 씌운 하위 `Component`에서  `useContext(context명)`을 이용해서
우리가 전달한 공통된 데이터에 접근이 가능하다.
```
export default function AppTheme() {
    return (
        <DarkModeProvider>
            <Header/>
            <Main/>
            <Footer/>
        </DarkModeProvider>
    )
}
```  
```
function ProductDetail() {
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext);
    return (
        <div>
            Product Detail
            <p>DarkMode:
                {
                    darkMode ? (
                            <span style={{backgroundColor: 'black', color: 'white'}}>
                            Dark Mode
                        </span>
                        ) :
                        (
                            <span>Light Mode</span>
                        )
                }
            </p>
            <button onClick={() => toggleDarkMode()}>Toggle</button>
        </div>
    );
}
```

## 성능 개선
```
import {useReducer, useState} from "react";
import personReducer from "./reducer/person-reducer";

export default function AppMentorsButton() {
    const [person, dispatch] = useReducer(personReducer,initialPerson);

    const handleUpdate = () => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const curr = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        dispatch({type: 'updated', prev, curr});
    }
    const handleAdd = () => {
        const name = prompt(`추가할 멘토의 이름을 입력해주세요.`);
        const title = prompt(`추가할 멘토의 타이틀을 입력해주세요.`);
        dispatch({type: 'added', name, title});
    };
    const handleDelete = () => {
        const name = prompt(`삭제할 멘토이름을 입력하세요`);
        dispatch({type: 'deleted', name,});
    };
    return (
        <div>
            <h1>
                {person.name}는 {person.title}
            </h1>
            <p>{person.name}의 멘토</p>
            <ul>
                {
                    person.mentors.map((mentor, index) => (
                        <li key={index}>
                            {mentor.name}({mentor.title})
                        </li>
                    ))
                }
            </ul>
            <Button onClick={handleUpdate} text={`멘토 이름 바꾸기`} />
            &nbsp;
            <Button onClick={handleAdd} text={`추가하기`}/>
            &nbsp;
            <Button onClick={handleDelete} text={`삭제하기`} />
        </div>
    );
}

function Button({text,onClick}) {
    console.log('Button',text,'re-rendering haha')
    const result = calculateSomething();
    return(
        <button
        onClick={onClick}
        style={
            {
                backgroundColor: 'black',
                color:'white',
                borderRadius:'20px',
                margin:'0.4rem',
                cursor:'pointer',
            }
        }
        >
            {`${text} ${result}` }
        </button>
    );
}

function calculateSomething() {
    for (let i = 0; i < 10000; i++) {
        console.log(`😍`);
    }
    return 10;
}

const initialPerson = {
    name: '박정환',
    title: '개발자',
    mentors: [
        {
            name: '밥',
            title: '시니어개발자',
        },
        {
            name: '제임스',
            title: '시니어개발자',
        },
    ]
};
```

버튼 `component`가 다시 호출될때 뭔가 복잡한 로직이 있다는 것을 임시적으로 나타내기 위해서 `for` 루프를 사용하였다.  
이렇게 되면 가장 상위 `Component` Mentors 가 변경될때 마다 모든 `Button Component`가 다시 `render`되서 성능저하가 발생한다.  
  
### 개선방법  
어떤 `Component` 안에서 무거운 로직을 수행할때 이 로직이 매번 실행되는 것이 아니라면 처음에만 호출 되어야만 한다면  
`useEffect`를 사용할 수 있다.  
  
또는 `useMemo`를 사용 할 수 있다.  
### useMemo
React의 `useMemo`는 `메모이제이션(Memoization)`을 사용하여 성능을 최적화하는 `React Hook`이다.  
`메모이제이션(Memoization)`이란 이전에 계산한 결과를 저장하고, 이후 같은 입력이 들어올 때 다시 계산하지 않고 저장된 결과를 반환하는 기술이다.  
즉, `useMemo`는 함수형 컴포넌트에서 계산 비용이 많이 드는 연산의 결과 값을 캐시합니다.  
첫번째 인자로 계산하고자 하는 함수를 두번째 인자로는 함수가 의존하는 값의 배열을 전달합니다.  
이때 두번째 인자값을 빈 배열로 전달하면 딱 한번만 수행한다.(렌더링 될때 한번)  
```
function Button({text,onClick}) {
    console.log('Button',text,'re-rendering haha')
    const result = useMemo(() => calculateSomething(), []);
    // const result = useMemo(() => calculateSomething(), [text]);
    return(
        <button
        onClick={onClick}
        style={
            {
                backgroundColor: 'black',
                color:'white',
                borderRadius:'20px',
                margin:'0.4rem',
                cursor:'pointer',
            }
        }
        >
            {`${text} ${result}` }
        </button>
    );
}
```
  
### useCallback
React의 `useCallback` 훅은 함수형 컴포넌트에서 성능 최적화를 위해 사용된다.  
. 첫 번째 파라미터는 메모이제이션 할 콜백 함수이고, 두 번째 파라미터는 의존성 배열이다.  
이 배열에 포함된 값이 변경될 때만 메모이제이션된 함수가 새롭게 생성된다.  
메모이제이션된 함수는 컴포넌트가 리렌더링될 때마다 다시 생성되는 것이 아니라, 이전에 생성된 함수를 재사용하여 성능상 이점을 가져온다.

```
    const handleUpdate = useCallback(() => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const curr = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        dispatch({type: 'updated', prev, curr});
    }, []);
```  
  
### useCallback 과 useMemo의 차이점  
두 함수 모두 컴포넌트의 성능 최적화를 위해 사용된다.  
단 `useCallback`은 함수 그자체를 캐시하고 `useMemo`는 계산 비용이 많이 드는 연산의 결과 값을 캐시한다.
  
### memo
위와 같은 방법으로 성능을 개선해도 상위 컴포넌트가 변경되면 하위 컴포넌트 자체는 다시 호출된다.  
즉 하위 컴포넌트에 전달되는 `props`는 매번 다른 객체값으로 할당 되기때문인데  
이를 실제 객체 안의 값이 변경되지 않으면 다시 호출되지 않도록 기억하는 것이 `memo`이다.  
  
`memo는` React에서 제공하는 고차 컴포넌트(Higher-Order Component)이다.  
이 컴포넌트는 React에서 컴포넌트 최적화를 위해 사용된다.  
즉, React memo를 사용하면 컴포넌트의 속성(props)이나 상태(state)가 변경되지 않는 한, 다시 컴포넌트를 렌더링하지 않는다. 

```
const Button = memo(({text, onClick}) => {
    console.log('Button', text, 're-rendering haha')
    const result = useMemo(() => calculateSomething(), []);
    return (
        <button
            onClick={onClick}
            style={
                {
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '20px',
                    margin: '0.4rem',
                    cursor: 'pointer',
                }
            }
        >
            {`${text} ${result}`}
        </button>
    );
});

```
  
## Custom Hook
우리가 `React`에서 `hook`을 사용할때 `use`라는 키워드의 함수를 사용한다.  
이와 같이 우리가 만드는 `Custom Hook` 역시 `use`로 시작하는 함수를 만드는 것으로 시작한다.  
```
export default function useProducts({salesOnly}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        setError(undefined);
        fetch(`data/${salesOnly ? 'sale_' : ''}products.json`)
            .then(res => res.json())
            .then(data => {
                console.log('데이터를 받아옴');
                setProducts(data);
                setLoading(false);
            })
            .catch((msg) => setError('에러가 발생했음!!'))
            .finally(() => setLoading(false));
        return () => {
            console.log('데이터 통신 종료')
        };
    }, [salesOnly]);

    return [loading,error,products];
}
```
`Custom Hook`은 일반 `Component`함수 처럼 내부에 `state(상태)`도 가지고 있을 수 있고  
다른 `React Hook`도 사용이 가능하다.  
단, 일반 `Component`와 다른점은 일반 `Component`는 `React`에게 전달해줄 `UI JSX`를 `return` 하는 반면에  
`Custom Hook`은 외부 사용자에게 공유하고 싶은 데이터를 `return` 하면 된다.  
  
사용 예제
```
    const [checked, setChecked] = useState(false);
    const [loading, error, products] = useProducts({salesOnly : checked});
``` 
  
### 주의사항
`Hooks`(함수들은) 값의 재사용이 아니라 `로직의 재사용을 위한 것 이다.`
