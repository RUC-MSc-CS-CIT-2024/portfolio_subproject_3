export default function InfoRow({ label, value }) {
  return (
    <p>
      <strong>{label}:</strong> {value || `Unknown ${label}`}
    </p>
  );
}
