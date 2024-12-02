import { Container, Tab, Tabs } from 'react-bootstrap';
import { useState } from 'react';
import { FollowingList } from '@/components';

export default function UserListsPage() {
  const [key, setKey] = useState('following');

  return (
    <Container>
      <h1>Profile Setting (user must be logged in)</h1>
      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="following" title="Following">
          Tab content for following list
        </Tab>
        <Tab eventKey="bookmarked" title="Bookmarked">
          Tab content for bookmarked list
        </Tab>
        <Tab eventKey="completed" title="Completed">
          Tab content for completed list
        </Tab>
      </Tabs>
    </Container>
  );
}
