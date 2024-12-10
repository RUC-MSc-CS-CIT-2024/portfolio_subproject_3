import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components';

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
