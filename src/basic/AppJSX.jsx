import logo from '../logo.svg';
import './App.css';

function AppJSX() {
    const name = 'mason';
    const list  = ['유유','딸기','바나나']
    return (
        <>
            <h1 className='orange'>{`Hello ${name}`}</h1>
            <h2>Heelo</h2>
            <p>name</p>
            <p>{name}</p>
            <ul>
                {
                    list.map(item => (
                        <li>${item}</li>
                    ))
                }
            </ul>
            <img
                style={{width:'200px',height:'200px'}}
                src="https://plus.unsplash.com/premium_photo-1671117132503-25b2baff4ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="pink"/>
        </>
    );
}

export default AppJSX;
