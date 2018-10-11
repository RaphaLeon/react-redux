import { createStore } from 'redux';


const $form = document.getElementById('form');

$form.addEventListener('submit', handleSubmit);


function handleSubmit(event) {
    event.preventDefault();

    const data = new FormData($form);
    const title = data.get('title');
    console.log(title);
    store.dispatch({
        type: 'ADD_SONG',
        payload: {
            title
        }
    })
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_SONG':
            return [...state, action.payload]
        default:
            return state
    }
}

const initialState = [
    {
        "title": "Keinelust"
    },
    {
        "title": "Have a nice day"
    },
    {
        "title": "Smooth criminal"
    },
]

const store = createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function render() {
    const $container = document.getElementById('playlist');
    const playlist = store.getState();
    $container.innerHTML = '';
    playlist.forEach(song => {
        const element = document.createElement('p');
        element.textContent = song.title;
        $container.appendChild(element);
    });
}
render();

function handleChange() {
    render();
}

store.subscribe(handleChange);