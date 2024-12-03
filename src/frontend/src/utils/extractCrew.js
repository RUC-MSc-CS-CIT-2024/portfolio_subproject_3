export const extractDirectors = (crew) => {
  return crew
    .filter((member) => member.jobCategory.toLowerCase().includes('director'))
    .map((member) => member.personName);
};

export const extractWriters = (crew) => {
  const createdByWriters = crew
    .filter(
      (member) =>
        member.jobCategory.toLowerCase().includes('writer') &&
        member.role.toLowerCase() === 'created by',
    )
    .map((member) => member.personName);

  if (createdByWriters.length > 0) {
    return createdByWriters;
  }

  return crew
    .filter((member) => member.jobCategory.toLowerCase().includes('writer'))
    .map((member) => member.personName);
};

export const extractProducer = (crew) => {
  return crew
    .filter((member) => member.jobCategory.toLowerCase().includes('producer'))
    .map((member) => member.personName);
};
