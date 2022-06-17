import axios from "../api";

const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const response = await axios.get("auth/refresh", {
        withCredentials: true,
      });
      return response.data.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  return refresh;
};

export default useRefreshToken;
