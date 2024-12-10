import './Rating.css';

export default function Rating({ ratings, noHeading = false }) {
  if (!ratings || ratings.length === 0) {
    return <div>No ratings available</div>;
  }
  return (
    <>
      {!noHeading && <h5 className="rating-headline">Rating</h5>}
      <div
        className={
          noHeading ? 'rating-container' : 'rating-container rating-margin'
        }
      >
        {ratings.map((rating, index) => (
          <div key={index} className="rating">
            <p>
              <strong>{rating.source}</strong>
            </p>
            <p>{rating.value}</p>
            {rating.voteCount && <p>{rating.voteCount} votes</p>}
          </div>
        ))}
      </div>
    </>
  );
}
