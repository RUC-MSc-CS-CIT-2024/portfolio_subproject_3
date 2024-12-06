import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

export default function DynamicBreadcrumb({ items = [] }) {
  return (
    <Breadcrumb className="my-4">
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={index}
          linkAs={item.path ? Link : 'span'}
          linkProps={item.path ? { to: item.path } : {}}
          active={!item.path}
          className={!item.path ? 'text-dark' : ''}
        >
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
