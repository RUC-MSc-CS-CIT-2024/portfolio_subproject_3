export const fetchAllPages = async (fetchFunction, count = 12) => {
  let allData = [];
  let currentPage = 1;
  let hasMoreData = true;

  while (hasMoreData) {
    const result = await fetchFunction(currentPage, count);
    allData = [...allData, ...result.items];
    hasMoreData = result.items.length === count;
    currentPage += 1;
  }

  return allData;
};
