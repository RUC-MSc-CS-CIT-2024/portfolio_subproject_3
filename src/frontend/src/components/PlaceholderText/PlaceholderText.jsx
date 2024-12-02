import { Placeholder } from 'react-bootstrap';

export default function PlaceholderText({ as, xs }) {
  return (
    <Placeholder as={as} animation="glow">
      <Placeholder xs={xs} />
    </Placeholder>
  );
}
