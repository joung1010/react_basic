import {useState} from "react";

export default function AppMentor() {
    const [person, setPerson] = useState({
        name: '박정환',
        title: '개발자',
        mentor:{
            name:'밥',
            title : '시니어개발자',
        },
    });
    return (
        <div>
            <h1>
                {person.name}는 {person.title}
            </h1>
            <p>
                {person.name}의 멘토는 {person.mentor.name}({person.mentor.title})
            </p>
            <button
            onClick={() => {
                const name = prompt(`what's your mentor's name?`);
                setPerson((pre) => {
                    const {name: myName, title: myTitle, mentor: {name: mentorName, title: mentorTitle}} = pre;
                    return {
                        name: myName,
                        title: myTitle,
                        mentor: {
                            name: name,
                            title: mentorTitle
                        },
                    };
                });
            }}
            >
                멘토 이름 바꾸기
            </button>
            <button
                onClick={() => {
                    const title = prompt(`what's your mentor's title?`);
                    setPerson((pre) => {
                        const {name: myName, title: myTitle, mentor: {name: mentorName, title: mentorTitle}} = pre;
                        return {
                            name: myName,
                            title: myTitle,
                            mentor: {
                                name: mentorName,
                                title: title
                            },
                        };
                    });

                }}
            >
                멘토 타이틀 바꾸기
            </button>
        </div>
    );
}