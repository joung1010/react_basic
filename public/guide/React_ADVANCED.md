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

