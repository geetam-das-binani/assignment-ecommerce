const URL = "https://dummyjson.com/auth/login";
import axios from "axios";
export const loginAuth = async (
  username,
  password,
  setUser,
  setError,
  setShowNotificationMessage
) => {
  try {
    const { data } = await axios.post(
      URL,
      {
        username,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUser(data.username);
    localStorage.setItem("Userauth", data.token);
    setShowNotificationMessage("Login Success");
  } catch (error) {
    setError(error.message);
  }
};
