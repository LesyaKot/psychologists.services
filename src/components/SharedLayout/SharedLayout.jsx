import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Loader from '../Loader/Loader';

export default function SharedLayout() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <main>
          <Outlet />
        </main>
      </Suspense>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
};