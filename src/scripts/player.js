export function Player(token) {
  const playerToken = token;
  let name = `Player ${playerToken}`;

  const getToken = () => {
    return playerToken;
  }

  const getName = () => {
    return name;
  }

  const setName = (newName) => {
    name = newName;
  }

  return {getToken, getName, setName};
}