const ADD_POS = "ADD-POST";
const UPDATE_NEW_TEXT = "UPDATE_NEW_TEXT";

const profileReducer = (state, action) => {
  switch (action.type) {
    case ADD_POS:
      let newPost = {
        id: 4,
        name: "New User",
        message: state.newPostText,
        likesCount: 7,
      };
      state.posts.push(newPost);
      state.newPostText = "";
      return state;
    case UPDATE_NEW_TEXT:
      state.newPostText = action.newTest;
      return state;
    default:
      return state;
  }
};

export const addPostActionCreator = () => ({ type: ADD_POS });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_TEXT,
  newTest: text,
});

export default profileReducer;
