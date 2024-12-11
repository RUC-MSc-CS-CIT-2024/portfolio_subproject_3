export const extractMembersByJobCategory = (crew, jobCategory, role = null) => {
  if (!Array.isArray(crew)) {
    return [];
  }

  let filteredMembers = crew.filter((member) =>
    member?.jobCategory?.toLowerCase().includes(jobCategory.toLowerCase()),
  );

  if (role) {
    filteredMembers = filteredMembers.filter(
      (member) => member?.role?.toLowerCase() === role.toLowerCase(),
    );
  }

  return filteredMembers.map((member) => member?.personName);
};
