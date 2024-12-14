export default function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="d-flex gap-2 align-items-center mb-2">
      <p className="fw-bold mb-0">{label}:</p> {value}
    </div>
  );
}
