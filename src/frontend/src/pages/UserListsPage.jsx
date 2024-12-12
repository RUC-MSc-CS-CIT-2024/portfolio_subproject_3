import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useAsyncEffect, useToast } from '@/hooks';
import {
  getCurrentUserBookmarks,
  getCurrentUserCompleted,
  getCurrentUserFollowing,
} from '@/services';
import { FollowingList, BookmarkList, CompletedList } from '@/components';

export default function UserListsPage() {
  const [key, setKey] = useState('following');
  const [bookmarks, setBookmarks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [following, setFollowing] = useState([]);
  const [currentPageFollowing, setCurrentPageFollowing] = useState(1);
  const [currentPageCompleted, setCurrentPageCompleted] = useState(1);
  const [currentPageBookmarks, setCurrentPageBookmarks] = useState(1);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(true);
  const [hasMoreCompleted, setHasMoreCompleted] = useState(true);
  const [hasMoreBookmarks, setHasMoreBookmarks] = useState(true);
  const { showToastMessage } = useToast();

  useAsyncEffect(
    async () => {
      const bookmarkResult = await getCurrentUserBookmarks(1, 5);
      const completedResult = await getCurrentUserCompleted(1, 5);
      const followingResult = await getCurrentUserFollowing(1, 5);
      return { bookmarkResult, completedResult, followingResult };
    },
    ({ bookmarkResult, completedResult, followingResult }) => {
      setBookmarks(bookmarkResult.items);
      setCompleted(completedResult.items);
      setFollowing(followingResult.items);
      setHasMoreFollowing(followingResult.items.length === 5);
      setHasMoreCompleted(completedResult.items.length === 5);
      setHasMoreBookmarks(bookmarkResult.items.length === 5);
    },
    [],
  );

  const loadMoreFollowing = async () => {
    try {
      const nextPage = currentPageFollowing + 1;
      const response = await getCurrentUserFollowing(nextPage, 5);
      setFollowing((prevFollowing) => [...prevFollowing, ...response.items]);
      setCurrentPageFollowing(nextPage);
      setHasMoreFollowing(response.items.length === 5);
    } catch (error) {
      console.error('Error loading more following:', error);
      showToastMessage('Error loading more following.', 'danger');
    }
  };

  const loadMoreCompleted = async () => {
    try {
      const nextPage = currentPageCompleted + 1;
      const response = await getCurrentUserCompleted(nextPage, 5);
      setCompleted((prevCompleted) => [...prevCompleted, ...response.items]);
      setCurrentPageCompleted(nextPage);
      setHasMoreCompleted(response.items.length === 5);
    } catch (error) {
      console.error('Error loading more completed:', error);
      showToastMessage('Error loading more completed.', 'danger');
    }
  };

  const loadMoreBookmarks = async () => {
    try {
      const nextPage = currentPageBookmarks + 1;
      const response = await getCurrentUserBookmarks(nextPage, 5);
      setBookmarks((prevBookmarks) => [...prevBookmarks, ...response.items]);
      setCurrentPageBookmarks(nextPage);
      setHasMoreBookmarks(response.items.length === 5);
    } catch (error) {
      console.error('Error loading more bookmarks:', error);
      showToastMessage('Error loading more bookmarks.', 'danger');
    }
  };

  return (
    <Container>
      <h1>Lists</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="following" title="Following">
          <FollowingList
            items={following}
            loadMoreFollowing={loadMoreFollowing}
            hasMoreItems={hasMoreFollowing}
          />
        </Tab>
        <Tab eventKey="bookmarked" title="Bookmarked">
          <BookmarkList
            items={bookmarks}
            loadMoreBookmarks={loadMoreBookmarks}
            hasMoreItems={hasMoreBookmarks}
          />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <CompletedList
            items={completed}
            loadMoreCompleted={loadMoreCompleted}
            hasMoreItems={hasMoreCompleted}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}
