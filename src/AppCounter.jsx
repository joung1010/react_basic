import './App.css';
import Counter from "./components/Counter";
import {useState} from "react";

function AppCounter() {
    const [totalCount,setTotalCount] = useState(0);
    const onHandleTotalCount = () => {
        setTotalCount((pre) => pre + 1);
    };
   return (
       <div className='container'>
           <div className='container-title'>TotalCount: {totalCount} {totalCount > 10 ? '🔥' : '❄️'}</div>
           <div className='container__counters'>
               <Counter onHandleTotalCount={onHandleTotalCount}/>
               <Counter onHandleTotalCount={onHandleTotalCount}/>
           </div>
       </div>
   );
}

export default AppCounter;
