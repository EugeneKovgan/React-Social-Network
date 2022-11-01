

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
    _callSubscriber () {
    console.log("_renderEntireTree");
  },

  getState() {
    return this._state
  },
  subscriber (observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    if (action.type === 'ADD-POST') {
      let newPost = {
        id: 4,
        name: "New User",
        message: this._state.profilePage.newPostText,
        likesCount: 7,
      };
      this._state.profilePage.posts.push(newPost);
      this._state.profilePage.newPostText = "";
      this._callSubscriber(this._state);
    } else if (action.type === "UPDATE_NEW_TEXT") {
      this._state.profilePage.newPostText = action.newTest;
      this._callSubscriber(this._state);
    }
  }
};

window.store = store;

export default store;
