import { createContext, useState, useEffect, useContext } from 'react';
import {
  getCurrentUserBookmarks,
  getCurrentUserCompleted,
  getCurrentUserFollowing,
} from '@/services/userService';
import { fetchAllPages } from '@/utils';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const bookmarkResult = await fetchAllPages(getCurrentUserBookmarks);
      const completedResult = await fetchAllPages(getCurrentUserCompleted);
      const followingResult = await fetchAllPages(getCurrentUserFollowing);

      setBookmarks(bookmarkResult);
      setCompleted(completedResult);
      setFollowing(followingResult);
    };

    fetchData();
  }, []);

  return (
    <UserDataContext.Provider
      value={{
        bookmarks,
        completed,
        following,
        setBookmarks,
        setCompleted,
        setFollowing,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
