const ADD_POS = "ADD-POST";
const UPDATE_NEW_TEXT = "UPDATE_NEW_TEXT";
const SET_USER_PROFILE = 'SET_USER_PROFILE';

let initialState = {
    posts: [
        {
            id: 1,
            name: "Leanne Graham",
            message: "Multi-layered client-server neural-net",
            likesCount: 15,
        },
        {
            id: 2,
            name: "Ervin Howell",
            message: "Proactive didactic contingency",
            likesCount: 12,
        },
        {
            id: 3,
            name: "Clementine Bauch",
            message: "Face to face bifurcated interface",
            likesCount: 17,
        },
    ],
    newPostText: "",
    profile: null
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POS:
            let newPost = {
                id: 4,
                name: "New User",
                message: state.newPostText,
                likesCount: 7,
            };
            return {...state, posts: [...state.posts, newPost], newPostText: ""};

        case UPDATE_NEW_TEXT:
            return {...state, newPostText: action.newText};
        case SET_USER_PROFILE:
            return {...state, profile: action.profile}

        default:
            return state;
    }
};

export const addPostActionCreator = () => ({type: ADD_POS});
export const updateNewPostTextActionCreator = (text) => ({
    type: UPDATE_NEW_TEXT,
    newText: text,
});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export default profileReducer;
