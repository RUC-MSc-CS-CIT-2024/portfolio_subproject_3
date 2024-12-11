import { MediaCard, GeneralCarousel } from '@/components';
import { formatDate } from '@/utils';

export default function MediaCarousel({
  media,
  loading,
  onLoadMore,
  hasNextPage,
}) {
  const renderItem = (mediaItem, loading) => (
    <MediaCard
      id={mediaItem.id}
      imageUri={mediaItem.posterUri}
      title={mediaItem.title}
      releaseYear={mediaItem.releaseYear || formatDate(mediaItem.releaseDate)}
      isLoading={loading}
      type={mediaItem.type}
    />
  );

  return (
    <GeneralCarousel
      items={media}
      loading={loading}
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      renderItem={renderItem}
    />
  );
}
