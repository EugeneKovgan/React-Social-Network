

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
        {id: 1, name: "Dima"},
        {id: 2, name: "Dima_2"},
        {id: 3, name: "Dima_3"},
        {id: 4, name: "Dima_4"},
        {id: 5, name: "Dima_5"},
      ],
      messages: [
        {id: 1, name: "Hi"},
        {id: 2, name: "Hello"},
        {id: 3, name: "Dima_3"},
        {id: 4, name: "Dima_4"},
        {id: 5, name: "Dima_5"},
      ],
    },
  },
  getState() {
    return this._state
  },
  _callSubscriber () {
    console.log("_renderEntireTree");
  },
  addPost ()  {
    let newPost = {
      id: 4,
      name: "New User",
      message: this._state.profilePage.newPostText,
      likesCount: 7,
    };
    this._state.profilePage.posts.push(newPost);
    this._state.profilePage.newPostText = "";
    this._callSubscriber(this._state);
  },

  updateNewPostText (newTest)  {
    this._state.profilePage.newPostText = newTest;
    this._callSubscriber(this._state);
  },

  subscriber (observer) {
    this._callSubscriber = observer;
  },
};

window.store = store;

export default store;
