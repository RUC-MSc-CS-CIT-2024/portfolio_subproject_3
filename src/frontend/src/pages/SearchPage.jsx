import { Container } from 'react-bootstrap';
import { fetchMedia } from '../services/mediaService';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SearchForm, MediaGrid, Pagination } from '@/components';

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mediaResults, setMediaResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMediaPage, setCurrentMediaPage] = useState(1);
  const [isMediaExpanded, setIsMediaExpanded] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const mediaItemsPerPage = 24;

  const handleMediaPageChange = (pageNumber) => {
    setCurrentMediaPage(pageNumber);
    console.log('Page number:', pageNumber);
  };

  const handleShowMore = (isExpanded) => {
    if (!isExpanded) {
      setIsMediaExpanded(true);
    } else {
      setIsMediaExpanded(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    const searchQuery = new URLSearchParams(location.search).get('q');
    if (!searchQuery) return;
    const queryType = location.search ? 'Simple' : 'All';

    const getMedia = async () => {
      try {
        const resultList = await fetchMedia({
          page: currentMediaPage,
          pageCount: mediaItemsPerPage,
          query: searchQuery,
          queryType,
        });
        setMediaResults(resultList.items);
        setTotalItems(resultList.numberOfItems);
      } catch (error) {
        console.error('Error searching:', error);
        setMediaResults([]);
      } finally {
        setLoading(false);
      }
    };

    getMedia();
  }, [currentMediaPage, location.search]);

  return (
    <Container>
      <h1>SearchPage</h1>
      <SearchForm
        btnVariant="dark"
        onSearch={(query) => navigate(`/search?q=${encodeURIComponent(query)}`)}
      />
      <h2 className="mt-5">Media results:</h2>
      <MediaGrid
        media={mediaResults}
        loading={loading}
        onShowMore={handleShowMore}
      />
      {isMediaExpanded && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={mediaItemsPerPage}
          currentPage={currentMediaPage}
          onPageChange={handleMediaPageChange}
        />
      )}
    </Container>
  );
}
