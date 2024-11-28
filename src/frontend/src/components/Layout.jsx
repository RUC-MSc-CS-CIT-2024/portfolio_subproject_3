import NavBar from '@/components/NavBar/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  );
}
