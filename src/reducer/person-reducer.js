export default function personReducer(person, action) {
    switch (action.type) {
        case 'updated': {
            const {prev, curr} = action;
            return {
                ...person
                , mentors: person.mentors.map((mentor) => {
                    if (mentor.name === prev) {
                        return {...mentor, name: curr};
                    }
                    return mentor;
                })
            };
        }
        case 'added':{
            const {name, title} = action;
            return {
                ...person
                , mentors: [...person.mentors
                    , {name, title}]
            };
        }
        case 'deleted':{
            const {name} = action;
            return {
                ...person,
                mentors: person.mentors.filter((mentor) => mentor.name !== name)
            };
        }
        default : {
            throw Error(`알수없는 action type 이다: ${action.type}`);
        }
    }
}