import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Videos(props) {
    const [text, setText] = useState('');
    const navviage = useNavigate()
    const handleChange = (e) => {
        setText(e.currentTarget.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        setText('');
        navviage(`/videos/${text}`);
    };
    return (
        <div>Videos
            <form onSubmit={onSubmit}>
                <input type="text" placeholder='video ID를 입력해줘' value={text} onChange={handleChange}/>
            </form>
        </div>
    );
}

export default Videos;