import './DefaultImage.css';

export default function DefaultImage() {
  return (
    <div className="mediaCard-img ">
      <svg xmlns="http://www.w3.org/2000/svg" className="default-svg rounded">
        <rect width="100%" height="100%" fill="#ddd" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="#aaa"
          fontSize="inherit"
        >
          No Image Found
        </text>
      </svg>
    </div>
  );
}
