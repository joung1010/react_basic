import {memo, useCallback, useMemo, useReducer, useState} from "react";
import personReducer from "./reducer/person-reducer";

export default function AppMentorsButton() {
    const [person, dispatch] = useReducer(personReducer,initialPerson);

    const handleUpdate = useCallback(() => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const curr = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        dispatch({type: 'updated', prev, curr});
    }, []);
    const handleAdd = useCallback(() => {
        const name = prompt(`추가할 멘토의 이름을 입력해주세요.`);
        const title = prompt(`추가할 멘토의 타이틀을 입력해주세요.`);
        dispatch({type: 'added', name, title});
    }, []);
    const handleDelete = useCallback(() => {
        const name = prompt(`삭제할 멘토이름을 입력하세요`);
        dispatch({type: 'deleted', name,});
    }, []);
    return (
        <div>
            <h1>
                {person.name}는 {person.title}
            </h1>
            <p>{person.name}의 멘토</p>
            <ul>
                {
                    person.mentors.map((mentor, index) => (
                        <li key={index}>
                            {mentor.name}({mentor.title})
                        </li>
                    ))
                }
            </ul>
            <Button onClick={handleUpdate} text={`멘토 이름 바꾸기`} />
            &nbsp;
            <Button onClick={handleAdd} text={`추가하기`}/>
            &nbsp;
            <Button onClick={handleDelete} text={`삭제하기`} />
        </div>
    );
}

const Button = memo(({text, onClick}) => {
    console.log('Button', text, 're-rendering haha')
    const result = useMemo(() => calculateSomething(), []);
    return (
        <button
            onClick={onClick}
            style={
                {
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: '20px',
                    margin: '0.4rem',
                    cursor: 'pointer',
                }
            }
        >
            {`${text} ${result}`}
        </button>
    );
});

function calculateSomething() {
    for (let i = 0; i < 10000; i++) {
        console.log(`😍`);
    }
    return 10;
}

const initialPerson = {
    name: '박정환',
    title: '개발자',
    mentors: [
        {
            name: '밥',
            title: '시니어개발자',
        },
        {
            name: '제임스',
            title: '시니어개발자',
        },
    ]
};