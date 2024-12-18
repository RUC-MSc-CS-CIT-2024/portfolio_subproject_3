import { PersonCard, GeneralCarousel } from '@/components';

export default function PersonsCarousel({ persons, onLoadMore, hasMoreItems }) {
  const renderItem = (person) => (
    <PersonCard
      id={person.id}
      pictureUri={person.pictureUri}
      name={person.name}
      role={Array.isArray(person.role) ? person.role.join(', ') : person.role}
      additionalInfo={
        person?.character?.length > 0
          ? `Character: ${Array.isArray(person.character) ? person.character.join(', ') : person.character}`
          : person.additionalInfo
      }
    />
  );

  return (
    <GeneralCarousel
      items={persons}
      onLoadMore={onLoadMore}
      hasNextPage={hasMoreItems}
      renderItem={renderItem}
      placeholderItem={<PersonCard />}
    />
  );
}
