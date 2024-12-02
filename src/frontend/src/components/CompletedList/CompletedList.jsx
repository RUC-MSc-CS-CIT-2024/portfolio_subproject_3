import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './CompletedList.css';
import { Link } from 'react-router-dom';

export default function CompletedList() {
  const data = [
    {
      completedId: 1,
      media: {
        id: 1,
        title: 'Avatar',
        type: 'Movie',
        posterUri:
          'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/kyeqWdyUXW608qlYkRqosgbbJyK.jpg',
      },
      score: {
        score: 5,
        reviewText: 'A great movie',
      },
      completedDate: '2021-01-01',
      rewatchability: 'High',
    },
    {
      completedId: 2,
      media: {
        id: 2,
        title: 'The Walking Dead',
        type: 'TV Show',
        posterUri:
          'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/n7PVu0hSz2sAsVekpOIoCnkWlbn.jpg',
      },
      score: {
        score: 4,
        reviewText: 'Great show, but the ending was disappointing',
      },
      completedDate: '2022-01-01',
      rewatchability: 'Medium',
    },
    {
      completedId: 3,
      media: {
        id: 3,
        title: 'Breaking Bad',
        type: 'TV Show',
        posterUri:
          'https://media.themoviedb.org/t/p/w300_and_h450_bestv2/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
      },
      score: {
        score: 3,
        reviewText: "Couldn't get into it",
      },
      completedDate: '2023-01-01',
      rewatchability: 'Low',
    },
  ];

  const rows = data.map((item) => (
    <tr key={item.completedId}>
      <td>
        <img className="mx-2" src={item.media.posterUri} height={68} />
        <Link to={`/media/${item.media.id}`}>{item.media.title}</Link>
      </td>
      <td className="align-middle">{item.media.type}</td>
      <td className="align-middle">{item.completedDate}</td>
      <td className="align-middle">{item.rewatchability}</td>
      <td className="align-middle">{item.score.score}</td>
      <td className="align-middle">{item.score.reviewText}</td>
      <td className="align-middle">
        <OverlayTrigger overlay={<Tooltip>Remove bookmark</Tooltip>}>
          <i className="bi bi-bookmark-x text-danger" />
        </OverlayTrigger>
      </td>
    </tr>
  ));

  return (
    <Table hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Type</th>
          <th>Completed Date</th>
          <th>Rewatchability</th>
          <th>Score</th>
          <th>Review Text</th>
          <th className="action-col"></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}
