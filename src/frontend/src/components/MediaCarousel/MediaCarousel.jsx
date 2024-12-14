import { MediaCard, GeneralCarousel } from '@/components';
import { formatDate } from '@/utils';

export default function MediaCarousel({ media, onLoadMore, hasNextPage }) {
  const renderItem = (mediaItem) => (
    <MediaCard
      id={mediaItem.id}
      imageUri={mediaItem.posterUri}
      title={mediaItem.title}
      releaseYear={mediaItem.releaseYear || formatDate(mediaItem.releaseDate)}
      type={mediaItem.type}
    />
  );

  return (
    <GeneralCarousel
      items={media}
      onLoadMore={onLoadMore}
      hasNextPage={hasNextPage}
      renderItem={renderItem}
    />
  );
}
