import { createContext, useState, useEffect, useContext } from 'react';
import {
  getCurrentUserBookmarks,
  getCurrentUserCompleted,
  getCurrentUserFollowing,
} from '@/services/userService';
import { fetchAllPages } from '@/utils';
import { useAuth } from '@/hooks';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchData = async () => {
    if (!isAuthenticated) {
      return;
    }
    const bookmarkResult = await fetchAllPages(getCurrentUserBookmarks);
    const completedResult = await fetchAllPages(getCurrentUserCompleted);
    const followingResult = await fetchAllPages(getCurrentUserFollowing);

    setBookmarks(bookmarkResult);
    setCompleted(completedResult);
    setFollowing(followingResult);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshUserData = () => {
    fetchData();
  };

  return (
    <UserDataContext.Provider
      value={{
        bookmarks,
        completed,
        following,
        setBookmarks,
        setCompleted,
        setFollowing,
        refreshUserData,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
