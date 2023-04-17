# React 에서 자주 사용하는 CSS 라이브러리

## PostCSS
우리가 일반적으로 사용하는 `CSS`를사용해서 `Component`를 만들어 보았다.
```
import React from 'react';
import './Button1.css'

.button {
    background: aqua;
}
function Button1(props) {
    return (
        <button className='button'>Button1</button>
    );
}

export default Button1;
```
```
import React from 'react';
import './Button2.css'
.button {
    background-color: plum;
}
function Button2(props) {
    return (
        <button className='button'>Button2</button>
    );
}

export default Button2;

```
이렇게 각각의 `Component`에 `CSS` 파일을 `import`하였다.  
각각의 버튼들은 다른 백그라운드 색갈을 가질까??  
![key.png](../memo/css.png)  
결과는 위와 같다.  
`CSS`파일에서 동일한 `class`명을 가지면 나중에 선언된 `class`가 더 명시시도가 높기 떄문에  
뒤에 선언한 값을 덮어쓴다.  
그렇기에 일반 `CSS`파일을 사용할떄는 이름 충돌을 막기위해서 네이밍 규칭인 `BEM`을 사용해서 작성해야 한다.  
```
.button1-button {
    background: aqua;
}
.button2-.button {
    background-color: plum;
}
```
이런식으로 서로 다른 클래스명을 사용해야한다.  
  
근데 생각해보면 `Component`는 계속 계속 추가될 수 있고 그럴때마다 이런식으로 `CSS`를 만드는 것은  
상당히 비효율적이고 번거러운 작업이 된다.  
  
이러한 문제를 해결할 수 있는 것이 `PostCSS` 이다.  
`PostCSS`는  CSS 전처리기(preprocessor)로, CSS의 기능을 확장하고 개선할 수 있는 도구 이다.  

전처리기란  원래의 코드를 변경하여 더 나은 코드를 생성하는 프로그램이다.  
일반적으로 전처리기는 원래 코드를 읽고 처리하여 새로운 코드를 생성하는 작업을 수행한다.  
  
### 사용법
`CSS` 파일을 생성할때 파일확장자 이전에 `.module` 붙여서 생성해주면 된다.  
```
Button1.module.css
Button2.module.css
```
```
import React from 'react';
import styles from './Button1.module.css'

function Button1(props) {
    return (
        <button className={styles.button}>Button1</button>
    );
}

export default Button1;
```

![key.png](../memo/2.css.png)  
  
이런식으로 `PostCSS`를 사용하면 외부의 이름충돌을 걱정하지 않고  
해당 `Component`에 `import`한 `class`이름을 작성하면  
`PostCSS` 에서 자동으로 클래스이름을 `.Button1_button__\+rPOd`이런식으로 고유한 `ID`값까지 붙여서  
클래스이름을 만들어준다.  
  
두개의 `CSS` 파일에서 동일한 이름의 클래스를 사용했지만
`CSS`를 파일별 모듈별로 관리를 해주기 때문에 이름 충돌을 걱정하지 않아도된다.  
또한 기존 `CSS`규칙을 그대로 따른 상태에서 관리해준다. 
