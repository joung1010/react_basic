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