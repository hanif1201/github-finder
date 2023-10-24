import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_REACT_APP_GITHUB_TOKEN;

// eslint-disable-next-line react/prop-types
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //fetch Users

  // const fetchUsers = async () => {
  //   setLoading();
  //   const response = await fetch(`${GITHUB_URL}/users`, {
  //     header: {
  //       Authorization: `token ${GITHUB_TOKEN}`,
  //     },
  //   });
  //   const data = await response.json();
  //   dispatch({
  //     type: "GET_USERS",
  //     payload: data,
  //   });
  // };

  //Get search Results
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });

    setLoading();
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      header: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //Get single User
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      header: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //Get repos
  const getRepos = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos`, {
      header: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
    });
  };

  function setLoading() {
    dispatch({
      type: "SET_LOADING",
    });
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        repos: state.repos,
        searchUsers,
        clearUsers,
        getUser,
        getRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
