import { InfoRow } from '@/components';

export default function InfoRowWithSeparator({ label, value, showSeparator }) {
  if (!value) return null;
  return (
    <>
      <InfoRow label={label} value={value} />
      {showSeparator && <p className="mx-3 lines">|</p>}
    </>
  );
}
