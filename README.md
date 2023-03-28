## CRS(Client Side Rendering)
![img](./public/memo/1.csr.png)  
  
계발자 도구를 통해서 확인해보면 처음에 localhost 라는 `document` 가 다운받아졌는데 이 문서가 우리가 보고있는 `HTML`페이지 이다.  
해당 문서를  확인해보니 사용자에게 보여지는 `<body>`를 `<div id ="root">` 말고는 아무것도 없는 것을 확인할 수 있다.  

![img](./public/memo/2.csr.png)  
  
### 근데 위의 화면 처럼 어떻게 이런 화면을 사용자가 볼 수 있는 것일까??
![img](./public/memo/3.csr.png)  

그 이유는 바로 `bundle.js` 파일이 있기 때문이다.  
우리 프로젝트를 브라우저에 보여주기 이전에 `Webpack`이 우리의 코드들을 위의 사진처럼 압축해서 준다.  
그래서 `Webpack`이 우리의 application 의 코드와 react 코드를 함께 묶어서 하나의 파일인 `bundle.js`로 만들어 준다.
그밖에 react_devtool 에 관련된 것들과 정적인 이미지들 ico, json 파일들이 함께 전송된다.  
**포인트는** 사용자가 `HTML`를 받았을때 페이지 소스를 확인해보면 `HTML`안에는 텅텅 비어져있다.(어떤 UI도 없다)  
  
왜냐하면 React 는 `Client Side Rendering` 이기 때문에 텅빈 HTML 파일과 우리 작성한 코드와 React 코드가 함꼐 전송이 되면서  
`Client Side` 에서 우리 코드가 동작이 되면서 우리가 작성한 코드대로 필요한 `DOM`요소(브라우저 UI 요소)를 동적으로 다이나믹하게 생성해준다.  
  
## React의 시작
![img](./public/memo/1.index.png)  

```
const root = ReactDOM.createRoot(document.getElementById('root'));
```
우리가 보는 `index.html`은 `public` 디렉토리 안에 있고 React의 시작점은 `src` 디렉토리 안에 있는 `index.js`에서 부터 시작한다.  
위의 코드를 보면 ` ReactDOM`에 `createRoot`라는 API를 사용해서 우리 `HTML Document`에 있는 `root라는 이름의 id 태그`를 가지고 와서  
거기에 `root`를 만들어 준다.  
```
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```
그래서 이 `root`에 우리의 첫번째 component를 rendering 할건데 그게 바로 `<App/>`이라는 component 이다.  
여기서 우리의 첫번째 component `<App/>`은 ` <React.StrictMode>` strict mode 롤 감싸져 있는데  
이 ` <React.StrictMode>` 모드는 Javascript 에서 `use strict`을 활성화 시키는 것처럼 동작한다.  
이때 계발할때만 엄격 모드가 적용되고 배포할때는 자동적으로 이 모드가 해제된다.  
즉, 계발하는 당시에만 무언가 잘못작성했을때 경고를 받아볼 수 있도록 하기 위해서이다.  
  
정리 하자면 브라우저에서 id 가 root인 요소를 찾아서 root 라는 가상의 요소를 만들고  
여기에 우리의 `<App/>` 이라는 component 를 연결시켜주는 것이다.  
그러면 React 가 내부적으로 `App` component로 들어가서 return 되는 `jsx`믄법을 확인한 다음에 어떤 태그를 만들어야 되는지 확인한 후  
브라우저에서 제공하는 `createElement`라는 동적으로 `DOM`요소를 생성하는 API를 사용해서 만들어야할 태그를 순서대로 생성해준다.  
  
  
## component 수정시 발생하는 오류 대처  
```
Compiled with problems:X

ERROR

[eslint] Failed to load config "react-app" to extend from.
Referenced from:
```  
발생원인은 create react-app 과 yarn 이 서로 충돌하기 떄문이다.  
따라서 `eslint`에 관련된 설정을 수동으로 설정해 줘야된다.  
1.해당 명령어를 추가해준다.
```
yarn add -D eslint-config-react-app
```  
2. 만약 설정후에도 해당 에러가 발생한다면  
```
Compiled with problems:X

ERROR

[eslint] Plugin "react" was conflicted between "package.json » eslint-config-react-app » C:\react_new\basic\.yarn\__virtual__\eslint-config-react-app-virtual-917c289b5c\0\cache\eslint
-config-react-app-npm-7.0.1-78bab43841-a67e082180.zip\node_modules\eslint-config-react-app\base.js" and "BaseConfig » C:\react_new\basic\.yarn\__virtual__\eslint-config-react-app-virtual-ed176a7a96\0\cache\eslint
-config-react-app-npm-7.0.1-78bab43841-a67e082180.zip\node_modules\eslint-config-react-app\base.js".
```  
  
3. 제일 상위에다가 `.yarnrc.yml` 파일을 만든후  
```
packageExtensions:
  react-scripts@*:
    peerDependencies:
      eslint-config-react-app: "*"
```  
해당설정을 추가해준다.  
```
packageExtensions:
  react-scripts@*: <- 기본적으로 모든 react scripts를 사용하고 있는데
  peerDependencies를 eslint 만큼은 우리가 설치한 것을 수동적으로 사용해줘~
```  
  
4. 만약 그후에도 오류가 난다면  
```
yarn cache clean
yarn install
```  
캐시를 삭제한후 `yarn install`로 다시 프로젝트를 세팅한 후 `yarn start`를 시작해본다.  
  
## JSX(JavaScript XML)  
  
먼저 component를 만들려면 함수 형태와 클래스 형태로 만들 수 있다.  
이때 함수로 생성시 함수 이름은 무조건 대문자로 시작해야 된다. 반환 값으로는 `JSX` 문법을 이용해서 UI 를 표기해야되는지 return 해 줘야 된다.  
  
JSX(JavaScript XML)은 `HTML` 유사하고 또 HTML 처럼 사용할 수 있다 이때 3가지 유의사항이 있다.  

1. JSX 를 return 할때는 반드시 하나의 태그만 return 해야된다.
   1. 이때 다수의 태그를 반환하고 싶다면 부모 태그로 한번더 감싸줘야 된다.
   2. 만약 이때 어떤 CSS 때문에 부모 태그로 감싸는 것이 아니라면 `<> </>` 빈 태그로 묶어서 반환해도 된다.
   3. React 내부적으로는 `<Fragment></Fragment>` 태그를 이용한다.  
```
        <Fragment>
            <h1>Hello</h1>
            <h2>Heelo</h2>
        </Fragment>
```
```
        <>
            <h1>Hello</h1>
            <h2>Heelo</h2>
        </>
```
2. HTML 에서는 class 를 사용하지만 `JSX`는 `className`을 이용해야 된다.
   1. 이게 가능한 이유는 `App.js`파일에서 `import './App.css';`를 import 하기 때문이다.
```
import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <>
            <h1 className='orange'>Hello</h1>
            <h2>Heelo</h2>
        </>
    );
}
```  

3. 이렇게 JSX 는 `HTML` 처럼 작성할 수 있지만 작성하는 공간이 js 파일이기때문에 JavaScript 역시 작성할 수 있다. 이때 JavaSCript 코드는 `{}`안에 작성한다.
   1. 이때 함수 안의 변수에 접근할때 `{}` 사용하지 않으면 문자로 인식해서 name 이 그대로 화면에 보여진다. `{}` 사용하면 변수에 접근에 `mason`값이 보여진다.
   2. 즉 JavaScript 코드를 작성할때는 `{}`를 이용해서 묶어 줘야 한다.
   3. 이미지 태그의 `width={{width:'200px',height:'200px'}}` 이것 역시 width 에 `JavaScript` 객체형태로 값을 전달 하기때문에 이역시 JavaScript 문법을 사용하므로 `{}`를 2번 사용하는 것이다.

```
function App() {
    const name = 'mason';
    return (
        <>
            <h1 className='orange'>Hello</h1>
            <h2>Heelo</h2>
            <p>name</p>
            <p>{name}</p>
            <ul>
                <li>우유</li>
                <li>딸기</li>
                <li>바나나</li>
            </ul>
            <img
                style={{width:'200px',height:'200px'}}
                src="https://plus.unsplash.com/premium_photo-1671117132503-25b2baff4ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="pink"/>
        </>
    );
```    
  
4. 추가적으로 `JSX` 문법을 사용할때 문자열과 JavaScript 변수를 같이 사용하고 싶을때는 어떻게 할까 바로 string template를 사용하면 된다.
```
function App() {
    const name = 'mason';
    return (
        <>
            <h1 className='orange'>{`Hello ${name}`}</h1>
        </>
    );
}
```  
  
5. `JSX` 에서 사용하는 반복분
   1. 먼저 JavaScript 문법을 사용하기때문에 `{}`를 사용
   2. map 함수를 이용해서 새로운 배열로 return 해주는데 그때 JSX 문법의 tag를 return
   3. 이때 값에 접근할때도 `{}`를 통해서 접근해야된다. 안그러면 문자로 인식한다.
```
function App() {
    const name = 'mason';
    const list  = ['유유','딸기','바나나']
    return (
        <>
            <ul>
                {
                    list.map(item => (
                        <li>${item}</li>
                    ))
                }
            </ul>
        </>
    );
}
```
  
[HTML을 JSX 변환해주는 사이트](https://transform.tools/html-to-jsx)
  
## Component
![img](./public/memo/1.component.png)  

React 에서 Component를 만들때 그냥 `.js` 보다는 `.jsx`확장자를 사용하면 순수 JavaScript 파일과 React Component 를 좀더 명확하게 구분할 수 있다.  
만약 `TypeScript`로 개발할때면 확장자를 `.ts`로 TypeScript를 이용해서 React Component를 만든다면 `.tsx`를 사용하면 된다.  
  
또한 우리가 만든 App 에서 Component를 만들어 나간다면 보통 `src` 디렉토리 안에 `components`디렉토리를 만들고 그안에 만들어 주면 구분하기 편한다.  
![img](./public/memo/2.component.png)  
  
React Component를 만들때 함수의 이름은 대문자로 시작해야 되고  
함수를 만든후에 항상 React 에서 사용할 수 있도록 `export`를 해줘야 한다.

```
function Profile() {
    return <h1>Profile</h1>;
}

export default Profile;

```
  
만약 위처럼 사용하면 함수의 이름을 바꾸게 될때마다 `export`부분도 같이 변경해 줘야만 한다.  
```
function Profile1() {
    return <h1>Profile</h1>;
}

export default Profile1;

```
  
그래서 함수 앞에 바로 `export`를 붙여주면 좀더 편하게 사용할 수 있다.  
  
```
export default function Profile() {
    return <h1>Profile</h1>;
}
```  
  
## Event 처리하기
React 에서 Event 처리는 HTML 에서 작성했을때와 같이 `onClick` 속성에 값을 전달하면 된다.  
```
            <button onClick={(event) => {
                console.log(event);
                alert('버튼 클릭!');
            }}>
            버튼
            </button>
```  
  
  
우리가 순수 JS 에서는 querySelector를 이용해서 요소를 가지고와서 거기에 Event를 등록을 했는데  
React 에서는 Tag 에 `onClick`이라는 속성을 이용해서 해당 값에 우리가 처리할 함수를 전달해 주면 된다.  
`React 는 브라우저에서 발생하는 Event를 React 에서 처리할 수 있는 Event 형태로 한단계 감싸서 객체로 만들어서  
Event Listener에 전달한다.`  

![img](./public/memo/reactEvent.png)  
우리가 순수 JS로 처리하는 Event와 동일한 데이터가 들어있는 것을 확인할 수 있다.  
따라서 `Event`를 등록할 때는 이런식으로 요소에다가 `onClick, onChange, onSubmit..`과 같이 등록하면 된다.  
  
또는 별도로 함수를 정의해서 전달할 수 있다.
```
   const handleClick = (event) => {
                console.log(event);
                alert('버튼 클릭!');
            };
               <button onClick={handleClick}>
            버튼
            </button>            
```  
단, 이때 주의할 점은 `event`처리 속성에 함수의 참조값을 전달해야한다.  
만약 `<button onClick={handleClick()}>` 이런식으로 전달하게되면 `handleClick`클릭을 실행하고 난후 반환된 값을 `onClick` 속성에 할당하게 된다.  
우리는 우리가 전달한 함수가 실행된 값을 할당하고 싶은 것이 아니라 `onClick`이 되었을때 우리의 함수를 연결 하고 싶은 것이다.  
즉, 함수를 연결하고 싶을때는 함수의 이름인 `참조값`을 전달해야 되고 함수를 호출해서는 안된다.

## 내부 상태 관리 State
![img](./public/memo/1.state.png) 
해당 화면에서 숫자를 증가 시킬려면 어떻게 해야 될까  
```
import React from "react";

export default function Counter() {
    let num = 0;
    return (
        <div className='counter'>
            <span className='number'>{num}</span>
            <button className='button' onClick={() => {num++}}>Add +</button>
        </div>
    );
}
```
  
이런식으로 `component`에 변경할 수 있는 변수를 선언하고  
click 할때 그 값을 변수를 1씩 증가시키면 되지않을까??  
결론적으로 말하면 클릭한다고해서 화면의 숫자 0의 값은 변경되지 않는다.  
왜 값이 증가하지 않는 것일까???  
일단 `console.log 로` 변수 `num`을 출럭해 보면
![img](./public/memo/2.state.png)  
값이 정상적으로 증가하지만 우리의 UI는 업데이트가 되지 않고 있다.  

React 에서는 이처럼 UI와 밀접한 관계가 있는 데이터를 `state`라는 곳에 보관한다.  
그래서 아무리 local 변수를 만들어서 보여준다고 해서, 또한 그 로컬 변수가 아무리 변경이 된다고 해서 `React`자체적으로는 그 값이 변경 되었는지 알 수 없다.  
  
따라서 `React` 라이브러리 에게 해당 값이 변경되었는지 알려줄려면  
즉, 값이 변경하면 UI가 변경되게 하고 싶다면 `useState()`를 사용해야 된다.  
이때 인자로 초기값을 전달해주면 된다.  

useState() : Returns a stateful value, and a function to update it.  
변경이 가능한 값과, 그 값을 변경할 수 있는 함수를 return 해준다.
  
```
const [number, setNumber] = useState(0);
```  
  
```
import React, {useState} from "react";

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className='counter'>
            <span className='number'>{count}</span>
            <button className='button' onClick={() => {

                setCount(count+1);}}>Add +</button>
        </div>
    );
}
```
  
`React`에서 제공하는 `setCount`를 이용해서 state 값을 변경하면 `React`가 자동적으로 함수 `Counter`를 다시 호출해준다.  
다시 호출된 `Counter` 함수를 통해 반환된 JSX에는 현재 counter 값을 보여주기 때문에 UI가 업데이트 된다.  
  
따라서 전달받은 props이 변경되거나 내부 state 상태가 변경된다면(setCount를 이용)   
내부 상태가 변경되고 이 내부 상태가 변경이될때마다 `React`는 변경이된 `component` 함수 전체를 다시 호출한다.  
이때 가상 DOM 요소인 Virtual DOM를 사용해서 이전 DOM 요소와 현재 DOM 요소를 비교해서  
실제 변경된 여기서는 `span`태그만 update 해준다.  
여기서 함수가 계속 다시 호출이 되는데 `count` 값이 0 으로 초기화 되지 않는 이유는  
`useState`라는 React 훅은 해당 `component` 내에서 아무리 다시 호출이 되어도 값을 기억하고 있기 때문에 아무리 다시 호출이 되어도 증가된 count 값을 기억할 수 있다.
