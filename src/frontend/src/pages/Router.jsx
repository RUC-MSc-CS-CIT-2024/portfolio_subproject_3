import { Route, Routes } from 'react-router-dom';
import PagesData from '@/pages/PagesData';
import Layout from '@/components/Layout';

export default function Router() {
  const pageRoutes = PagesData.map(({ path, title, element }) => {
    return <Route key={title} path={path} element={element} />;
  });

  return (
    <Layout>
      <Routes>{pageRoutes}</Routes>
    </Layout>
  );
}
