let renderEntireTree = () => {
  console.log("renderEntireTree");
};

const state = {
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
      { id: 1, name: "Hi" },
      { id: 2, name: "Hello" },
      { id: 3, name: "Dima_3" },
      { id: 4, name: "Dima_4" },
      { id: 5, name: "Dima_5" },
    ],
  },
};

window.state = state;

export const addPost = () => {
  let newPost = {
    id: 4,
    name: "New User",
    message: state.profilePage.newPostText,
    likesCount: 7,
  };
  state.profilePage.posts.push(newPost);
  state.profilePage.newPostText = "";
  renderEntireTree(state);
};

export const updateNewPostText = (newTest) => {
  state.profilePage.newPostText = newTest;
  renderEntireTree(state);
};

export const subscriber = (observer) => {
  renderEntireTree = observer;
};

export default state;
