import {useState} from "react";
import {useImmer} from "use-immer";

export default function AppMentorsImmer() {
    const [person, updatePerson] = useImmer(initialPerson);
    const handleUpdate = () => {
        const prev = prompt(`누구의 이름을 바꾸고 싶은가요?`);
        const current = prompt(`이름을 무엇으로 바꾸고 싶은가요?`);
        updatePerson(person => {
            const mentor = person.mentors.find(m => m.name === prev);
            mentor.name = current;
        });
    };

    const handleAdd = () => {
        const name = prompt(`추가할 멘토의 이름을 입력해주세요.`);
        const title = prompt(`추가할 멘토의 타이틀을 입력해주세요.`);
        updatePerson(person => {person.mentors.push({name, title})});
    };

    const handleDelete = () => {
        const name = prompt(`삭제할 멘토이름을 입력하세요`);
        updatePerson(person => {
            const index = person.mentors.findIndex(m => m.name === name);
            person.mentors.splice(index, 1);
        });
    };
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
            <button onClick={handleUpdate}>멘토 이름 바꾸기</button>
            &nbsp;
            <button onClick={handleAdd}>추가하기</button>
            &nbsp;
            <button onClick={handleDelete}>삭제하기</button>
        </div>
    );
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