import ReactStarsRating from 'react-awesome-stars-rating';

export default function Rating({ ratings }) {
  if (!ratings || ratings.length === 0) {
    return <div>No ratings available</div>;
  }

  const formatVoteCount = (count) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count;
  };

  const formatSourceName = (source) => {
    if (source === 'metacritic') {
      return 'Metacritic';
    } else if (source === 'rottentomatoes') {
      return 'Rotten Tomatoes';
    }
    return source;
  };

  return (
    <>
      <div className="d-flex w-100 mt-5">
        {ratings.map((rating, index) => (
          <div
            key={index}
            className="d-flex flex-column align-items-center w-100"
          >
            <p className="mb-3">
              <strong>{formatSourceName(rating.source)} rating</strong>
            </p>
            {rating.source === 'IMDb' ? (
              <div className="d-flex align-items-center gap-2">
                <ReactStarsRating
                  value={1}
                  count={1}
                  size={30}
                  isHalf={false}
                  primaryColor="orange"
                  secondaryColor="grey"
                />
                <div className="d-flex flex-column">
                  <p className="mb-0 fs-5">
                    <span className="fw-bold">{rating.value}</span>/10
                  </p>
                  {rating.voteCount && (
                    <p className="mb-0">{formatVoteCount(rating.voteCount)}</p>
                  )}
                </div>
              </div>
            ) : rating.source === 'metacritic' ||
              rating.source === 'rottentomatoes' ? (
              <div className="d-flex gap-2">
                <p className="mb-0 fs-5">
                  <span className="fw-bold">{rating.value}</span>%
                </p>
              </div>
            ) : rating.source === 'Popularity' ? (
              <div className="d-flex flex-column">
                <p className="mb-0 fs-5">
                  <span className="fw-bold">
                    {' '}
                    {typeof rating.value === 'number'
                      ? rating.value.toFixed(1)
                      : rating.value}
                  </span>
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <p>{rating.value}</p>
                {rating.voteCount && (
                  <p>{formatVoteCount(rating.voteCount)} votes</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
