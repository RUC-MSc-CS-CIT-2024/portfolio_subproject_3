import { PersonCard, GeneralCarousel } from '@/components';

export default function PersonsCarousel({
  persons,
  loading,
  onLoadMore,
  hasMoreItems,
}) {
  const renderItem = (person, loading) => (
    <PersonCard
      id={person.id}
      pictureUri={person.pictureUri}
      name={person.name}
      role={Array.isArray(person.role) ? person.role.join(', ') : person.role}
      additionalInfo={person.additionalInfo}
      isLoading={loading}
    />
  );

  return (
    <GeneralCarousel
      items={persons}
      loading={loading}
      onLoadMore={onLoadMore}
      hasNextPage={hasMoreItems}
      renderItem={renderItem}
    />
  );
}
