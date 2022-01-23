export function getUserData() {
  const users = localStorage.getItem("users");
  return JSON.parse(users);
}

export function addUser({ firstName, lastName, email, password, mobileNo }) {
  const users = JSON.parse(localStorage.getItem("users"));
  if (!users) {
    const usersData = [];
    const newUser = {
      broadcasterID: "BM1001",
      firstName,
      lastName,
      email,
      password,
      mobileNo,
    };

    usersData.push(newUser);
    localStorage.setItem("users", JSON.stringify(usersData));
    return "BM1001";
  }

  const usersCopy = [...users];
  const prevBroadcasterId = usersCopy[usersCopy.length - 1].broadcasterID;
  const newBroadcasterId = `BM${
    Number.parseInt(prevBroadcasterId.slice(2)) + 1
  }`;

  const newUser = {
    broadcasterID: newBroadcasterId,
    firstName,
    lastName,
    email,
    password,
    mobileNo,
  };

  usersCopy.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersCopy));

  return newBroadcasterId;
}

export function changePassword({ broadcasterId, password }) {
  const users = JSON.parse(localStorage.getItem("users"));

  const usersCopy = [...users];
  const findUser = usersCopy.filter(
    (user) => user.broadcasterID === broadcasterId
  );

  if (!findUser.length) return false;

  const user = findUser[0];
  user.password = password;
  localStorage.setItem("users", JSON.stringify(usersCopy));
  return true;
}
