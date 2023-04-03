import {useEffect, useState} from "react";

export default function Products() {
    const [count,setCount] = useState(0);
    const [products,setProducts] = useState([]);
    // public 에 있는 jon 파일을 동적으로 불러오는 방법1
/*    fetch('data/products.json')
        .then(res => res.json())
        .then(data => {
            console.log('데이터를 받아옴');
            setProducts(data);
        });*/
    useEffect(()=>{
        fetch('data/products.json')
            .then(res => res.json())
            .then(data => {
                console.log('데이터를 받아옴');
                setProducts(data);
            });
        return () => {
            console.log('데이터 통신 종료')
        };
    },[]);
    
    return(
        <>
            <ul>
                {
                    products.map((product)=>(
                        <li key={product.id}>
                            <article>
                                <h3>{product.name}</h3>
                                <p>{product.price}</p>
                            </article>
                        </li>
                    ))
                }
            </ul>
            <button onClick={() => setCount((pre)=>pre+1)}>{count}</button>
        </>
    );
}