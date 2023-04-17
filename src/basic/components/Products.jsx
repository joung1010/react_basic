import { useState} from "react";
import useProducts from "../../hooks/use-products";

export default function Products() {
    const [checked, setChecked] = useState(false);
    const [loading, error, products] = useProducts({salesOnly : checked});

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

    if(loading) return <p>Loading...</p>

    if(error) return <p>{error}</p>;
    return(
        <>
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
        </>
    );
}