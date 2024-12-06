import { Badge } from 'react-bootstrap';
import './MediaCardBadge.css';

export default function MediaCardBadge({ type }) {
  let content;

  switch (type) {
    case 'tvShort':
      content = <Badge bg="info">TV Short</Badge>;
      break;
    case 'movie':
      content = <Badge bg="info">Movie</Badge>;
      break;
    case 'tvMovie':
      content = <Badge bg="info">TV Movie</Badge>;
      break;
    case 'short':
      content = <Badge bg="info">Short</Badge>;
      break;
    case 'tvMiniSeries':
      content = <Badge bg="info">TV Mini Series</Badge>;
      break;
    case 'videoGame':
      content = <Badge bg="info">Video Game</Badge>;
      break;
    case 'tvEpisode':
      content = <Badge bg="info">TV Episode</Badge>;
      break;
    case 'tvSeason':
      content = <Badge bg="info">TV Season</Badge>;
      break;
    case 'video':
      content = <Badge bg="info">Video</Badge>;
      break;
    case 'tvSpecial':
      content = <Badge bg="info">TV Special</Badge>;
      break;
    case 'tvSeries':
      content = <Badge bg="info">TV Series</Badge>;
      break;
    default:
      content = <Badge bg="info">Media</Badge>;
      break;
  }
  return <div>{content}</div>;
}
