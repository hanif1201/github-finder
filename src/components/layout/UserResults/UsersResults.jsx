import { useEffect } from "react";

const UsersResults = () => {
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_GITHUB_URL}/users`,
      {
        header: {
          Authorization: `token ${import.meta.env.VITE_REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return <div>UsersResults</div>;
};

export default UsersResults;
