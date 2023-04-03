import './App.css';
import {useState} from "react";
import Products from "./components/Products";

export default function AppProduct() {
    const [showProducts, setShowProducts] = useState(true);
   return (
    <div>
        {showProducts && <Products/>}
        <button onClick={() => setShowProducts((show)=>!show)}>Toggle</button>
    </div>
   );
}


