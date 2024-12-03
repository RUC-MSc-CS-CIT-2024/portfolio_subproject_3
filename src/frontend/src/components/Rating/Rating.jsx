import './Rating.css';

export default function Rating({ ratings }) {
  return (
    <>
      <h5 className="rating-headline">Rating</h5>
      <div className="rating-container">
        {ratings.map((rating, index) => (
          <div key={index} className="rating">
            <p>
              <strong>{rating.name}</strong>
            </p>
            <p>{rating.score}</p>
          </div>
        ))}
      </div>
    </>
  );
}
