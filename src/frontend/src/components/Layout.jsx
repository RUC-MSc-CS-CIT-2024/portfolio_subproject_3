import { NavBar } from '@/components';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
