import React, {useState} from "react";

export default function Counter({onHandleTotalCount}) {
    const [count, setCount] = useState(0);

    return (
        <div className='counter'>
            <span className='number'>{count}</span>
            <button className='button'
                    onClick={() => {
                        setCount((pre) => pre + 1);
                        onHandleTotalCount();
                    }}
            >
                Add +
            </button>
        </div>
    );
}