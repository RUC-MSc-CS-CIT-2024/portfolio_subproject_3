import './Rating.css';

export default function Rating({ ratings }) {
  if (!ratings || ratings.length === 0) {
    return <div>No ratings available</div>;
  }
  return (
    <>
      <h5 className="rating-headline">Rating</h5>
      <div className="rating-container">
        {ratings.map((rating, index) => (
          <div key={index} className="rating">
            <p>
              <strong>{rating.source}</strong>
            </p>
            <p>{rating.value}</p>
            <p>{rating.voteCount} votes</p>
          </div>
        ))}
      </div>
    </>
  );
}
