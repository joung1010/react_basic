import logo from './logo.svg';
import './App.css';

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
}

export default App;
