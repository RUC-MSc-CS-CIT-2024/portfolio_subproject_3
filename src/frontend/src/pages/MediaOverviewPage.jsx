import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { MediaCarousel, MediaGrid } from '@/components';
import { fetchMedia } from '@/services';

export default function MediaOverviewPage() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const initialCount = 12;
  const subsequentCount = 6;

  useEffect(() => {
    const loadMedia = async () => {
      setLoading(true);
      try {
        const count = page === 1 ? initialCount : subsequentCount;
        const fetchedMedia = await fetchMedia({ page, pageCount: count });
        setMedia((prevMedia) =>
          page === 1
            ? fetchedMedia.items
            : [...prevMedia, ...fetchedMedia.items],
        );
        setHasNextPage(!!fetchedMedia.nextPage);
      } catch (error) {
        console.error('Error loading media:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [page]);

  const handleLoadMore = () => {
    if (!loading && hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <Container>
      <h1>Media</h1>
      <MediaCarousel
        media={media}
        loading={loading}
        onLoadMore={handleLoadMore}
        hasNextPage={hasNextPage}
        initialCount={initialCount}
      />
      <MediaGrid media={media} />
    </Container>
  );
}
