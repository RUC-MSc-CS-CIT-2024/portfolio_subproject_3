import { Container, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { FollowingList, BookmarkList, CompletedList } from '@/components';

export default function UserListsPage() {
  const [key, setKey] = useState('following');

  return (
    <Container>
      <h1>Profile Setting (user must be logged in)</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="following" title="Following">
          <FollowingList />
        </Tab>
        <Tab eventKey="bookmarked" title="Bookmarked">
          <BookmarkList />
        </Tab>
        <Tab eventKey="completed" title="Completed">
          <CompletedList />
        </Tab>
      </Tabs>
    </Container>
  );
}
