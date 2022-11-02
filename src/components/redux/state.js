const ADD_POS = "ADD-POST";
const UPDATE_NEW_TEXT = "UPDATE_NEW_TEXT";
const UPDATE_NEW_MESSAGE = "UPDATE_NEW_MESSAGE";
const SEND_NEW_MESSAGE = "SEND_NEW_MESSAGE";

const store = {
  _state: {
    profilePage: {
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
    },
    dialogsPage: {
      dialogs: [
        { id: 1, name: "Dima" },
        { id: 2, name: "Dima_2" },
        { id: 3, name: "Dima_3" },
        { id: 4, name: "Dima_4" },
        { id: 5, name: "Dima_5" },
      ],
      messages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "Hello" },
        { id: 3, message: "Dima_3" },
        { id: 4, message: "Dima_4" },
        { id: 5, message: "Dima_5" },
      ],
      newMessageBody: "",
    },
  },
  _callSubscriber() {
    console.log("_renderEntireTree");
  },

  getState() {
    return this._state;
  },
  subscriber(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === ADD_POS) {
      let newPost = {
        id: 4,
        name: "New User",
        message: this._state.profilePage.newPostText,
        likesCount: 7,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_TEXT) {
      this._state.profilePage.newPostText = action.newTest;
      this._callSubscriber(this._state);
    } else if (action.type === UPDATE_NEW_MESSAGE) {
      this._state.dialogsPage.newMessageBody = action.body;
      this._callSubscriber(this._state);
    } else if (action.type === SEND_NEW_MESSAGE) {
      let body = this._state.dialogsPage.newMessageBody;
      this._state.dialogsPage.newMessageBody = "";
      this._state.dialogsPage.messages.push({ id: 6, message: body });
      this._callSubscriber(this._state);
    }
  },
};

export const addPostActionCreator = () => ({ type: ADD_POS });
export const updateNewPostTextActionCreator = (text) => ({
  type: UPDATE_NEW_TEXT,
  newTest: text,
});
export const sendMessageCreator = () => ({
  type: SEND_NEW_MESSAGE,
});
export const updateNewMessageBodyCreator = (body) => ({
  type: UPDATE_NEW_MESSAGE,
  body: body,
});

window.store = store;

export default store;
