import {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from 'react';
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

  const refreshUserData = useCallback(async () => {
    if (!isAuthenticated) {
      setBookmarks([]);
      setCompleted([]);
      setFollowing([]);
      return;
    }
    const bookmarkResult = await fetchAllPages(getCurrentUserBookmarks);
    const completedResult = await fetchAllPages(getCurrentUserCompleted);
    const followingResult = await fetchAllPages(getCurrentUserFollowing);

    setBookmarks(bookmarkResult);
    setCompleted(completedResult);
    setFollowing(followingResult);
  }, [isAuthenticated]);

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const contextValue = useMemo(() => {
    return {
      bookmarks,
      completed,
      following,
      setBookmarks,
      setCompleted,
      setFollowing,
      refreshUserData,
    };
  }, [bookmarks, completed, following, refreshUserData]);

  return (
    <UserDataContext.Provider value={contextValue}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = () => useContext(UserDataContext);
