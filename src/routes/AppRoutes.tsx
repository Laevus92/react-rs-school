import { Routes, Route } from 'react-router-dom';
import { Page } from '../components/Page/Page';
import { AppRoutesProps } from '../types/AppRoutesProps';

export const AppRoutes = (props: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/page/:number" element={<Page props={props} />} />
    </Routes>
  );
};
