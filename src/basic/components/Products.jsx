import {useEffect, useState} from "react";

export default function Products() {
    const [products,setProducts] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleChange = () => {
        setChecked((pre) => !pre);
    };

    // public 에 있는 jon 파일을 동적으로 불러오는 방법1
/*    fetch('data/products.json')
        .then(res => res.json())
        .then(data => {
            console.log('데이터를 받아옴');
            setProducts(data);
        });*/
    useEffect(()=>{
        setLoading( true);
        fetch(`data/${checked ? 'sale_' : ''}products.json`)
            .then(res => res.json())
            .then(data => {
                console.log('데이터를 받아옴');
                setProducts(data);
                setLoading( false);
            })
            .catch(() => setError(true));
        return () => {
            console.log('데이터 통신 종료')
        };
    },[checked]);

    return(
        <>
            { error ? <div>에러가 발생 했음</div> :
                loading ? <div>Loading!!!</div>
                    :(
                        <div>
                            <input id="checkbox" type="checkbox" value={checked} checked={checked} onChange={handleChange}/>
                            <label htmlFor="checkbox">Show only 🔥 Sale</label>
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
                        </div>
                    )
            }
        </>
    );
}