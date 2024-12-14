import { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks';
import { useUserData } from '@/contexts';
import { FollowingList, BookmarkList, CompletedList } from '@/components';
import {
  getCurrentUserBookmarks,
  getCurrentUserCompleted,
  getCurrentUserFollowing,
} from '@/services';

export default function UserListsPage() {
  const {
    bookmarks,
    completed,
    following,
    setBookmarks,
    setCompleted,
    setFollowing,
    refreshUserData,
  } = useUserData();
  const { showToastMessage } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('following');
  const [pagination, setPagination] = useState({
    following: { currentPage: 1, hasMore: true },
    completed: { currentPage: 1, hasMore: true },
    bookmarks: { currentPage: 1, hasMore: true },
  });

  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleTabSelect = (key) => {
    setActiveTab(key);
    navigate(`#${key}`);
  };

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const loadMoreItems = async (type) => {
    try {
      const nextPage = pagination[type].currentPage + 1;
      let response;
      switch (type) {
        case 'following':
          response = await getCurrentUserFollowing(nextPage, 5);
          setFollowing((prev) => [...prev, ...response.items]);
          break;
        case 'completed':
          response = await getCurrentUserCompleted(nextPage, 5);
          setCompleted((prev) => [...prev, ...response.items]);
          break;
        case 'bookmarks':
          response = await getCurrentUserBookmarks(nextPage, 5);
          setBookmarks((prev) => [...prev, ...response.items]);
          break;
        default:
          return;
      }
      setPagination((prev) => ({
        ...prev,
        [type]: {
          currentPage: nextPage,
          hasMore: response.items.length === 5,
        },
      }));
    } catch (error) {
      console.error(`Error loading more ${type}:`, error);
      showToastMessage(`Error loading more ${type}.`, 'danger');
    }
  };

  return (
    <Container>
      <h1>Lists</h1>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="user-lists-tabs"
      >
        <Tab eventKey="following" title="Following">
          <FollowingList
            items={following}
            loadMoreFollowing={() => loadMoreItems('following')}
            hasMoreItems={pagination.following.hasMore}
          />
        </Tab>
        <Tab eventKey="bookmarked" title="Bookmarked">
          <BookmarkList
            items={bookmarks}
            loadMoreBookmarks={() => loadMoreItems('bookmarks')}
            hasMoreItems={pagination.bookmarks.hasMore}
          />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <CompletedList
            items={completed}
            loadMoreCompleted={() => loadMoreItems('completed')}
            hasMoreItems={pagination.completed.hasMore}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}
