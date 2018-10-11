import schema from '../schemas/index';

const initialState = {
    entities: schema.entities,
    categories: schema.result.categories,
    search: []
}

function data (state = initialState, action) {
    switch (action.type) {
        case 'SEARCH_VIDEO': {
            let results = [];
            let playLists = [];
            if(action.payload.query) {
                state.data.categories.forEach(category => {
                   category.playlist.forEach(playlist => {
                        playLists.push(playlist);
                    });
                });
                //console.log(playLists);
                results = playLists.filter(media => {
                    return media.author.toUpperCase().includes(action.payload.query.toUpperCase())
                })
            }
            return { 
                ...state,
                search: results
            }
        }
        default:
            return state;
    }
}

export default data;