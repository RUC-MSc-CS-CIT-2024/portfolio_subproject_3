import { Pagination as Paginate } from 'react-bootstrap';

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const generatePaginationItems = () => {
    const items = [];
    const range = 1;

    for (let page = 1; page <= totalPages; page++) {
      if (
        page === 1 ||
        page === totalPages ||
        (page >= currentPage - range && page <= currentPage + range)
      ) {
        items.push(
          <Paginate.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Paginate.Item>,
        );
      } else if (
        (page === currentPage - range - 1 ||
          page === currentPage + range + 1) &&
        items[items.length - 1]?.props.children !== '...'
      ) {
        items.push(<Paginate.Ellipsis key={`ellipsis-${page}`} />);
      }
    }

    return items;
  };

  return (
    <div className="d-flex justify-content-center my-3">
      <Paginate size="sm" className="mb-0">
        <Paginate.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <Paginate.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {generatePaginationItems()}
        <Paginate.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Paginate.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Paginate>
    </div>
  );
}
