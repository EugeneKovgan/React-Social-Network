import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

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
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    //this._state.dialogsPage = dialogsReducer(this.getState().dialogsPage, action);
    //this._state.profilePage = profileReducer(this.getState().profilePage, action);

    this._callSubscriber(this._state);
  },
};

window.store = store;

export default store;
