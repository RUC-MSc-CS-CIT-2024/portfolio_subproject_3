import { PersonCard, GeneralCarousel } from '@/components';

export default function PersonsCarousel({ persons, onLoadMore, hasMoreItems }) {
  const renderItem = (person) => (
    <PersonCard
      id={person.id}
      pictureUri={person.pictureUri}
      name={person.name}
      role={person.role}
      additionalInfo={person.additionalInfo}
    />
  );

  return (
    <GeneralCarousel
      items={persons}
      onLoadMore={onLoadMore}
      hasNextPage={hasMoreItems}
      renderItem={renderItem}
    />
  );
}
