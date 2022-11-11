const Users = (props) => {
  if (props.users.length == 0) {
    props.setUsers([
      {
        id: 1,
        fullName: "Leanne Graham",
        status: "User-centric fault-tolerant solution",
        location: "Gwenborough",
        country: "BY",
        followed: true,
      },
      {
        id: 2,
        fullName: "Ervin Howell",
        status: "Synchronised bottom-line interface",
        location: "Wisokyburgh",
        country: "BY",
        followed: false,
      },
      {
        id: 3,
        fullName: "Clementine Bauch",
        status: "Configurable multimedia task-force",
        location: "McKenziehaven",
        country: "BY",
        followed: true,
      },
    ]);
  }

  return (
    <div>
      {props.users.map((item) => (
        <div key={item.id}>
          <span>{item.fullName}</span>
          {item.followed ? (
            <button
              onClick={() => {
                props.unfollow(item.id);
              }}
            >
              "follow"
            </button>
          ) : (
            <button
              onClick={() => {
                props.follow(item.id);
              }}
            >
              "unfollow"
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;
