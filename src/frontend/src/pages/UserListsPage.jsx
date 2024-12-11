import { useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useAsyncEffect } from '@/hooks';
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

  useAsyncEffect(
    async () => {
      const bookmarkResult = await getCurrentUserBookmarks(1, 10);
      const completedResult = await getCurrentUserCompleted(1, 10);
      const followingResult = await getCurrentUserFollowing(1, 10);
      return { bookmarkResult, completedResult, followingResult };
    },
    ({ bookmarkResult, completedResult, followingResult }) => {
      setBookmarks(bookmarkResult.items);
      setCompleted(completedResult.items);
      setFollowing(followingResult.items);
    },
    [],
  );

  return (
    <Container>
      <h1>Lists</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="following" title="Following">
          <FollowingList items={following} />
        </Tab>
        <Tab eventKey="bookmarked" title="Bookmarked">
          <BookmarkList items={bookmarks} />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <CompletedList items={completed} />
        </Tab>
      </Tabs>
    </Container>
  );
}
