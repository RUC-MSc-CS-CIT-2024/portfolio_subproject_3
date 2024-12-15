import { useState, useEffect } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUserData } from '@/contexts';
import { FollowingList, BookmarkList, CompletedList } from '@/components';

export default function UserListsPage() {
  const { bookmarks, completed, following, refreshUserData } = useUserData();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('following');

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

  return (
    <Container>
      <h1>Lists</h1>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabSelect}
        id="user-lists-tabs"
      >
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
