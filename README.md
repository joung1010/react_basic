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
