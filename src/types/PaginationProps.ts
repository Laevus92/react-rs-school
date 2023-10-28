import { MouseEvent } from 'react';

type PaginationProps = {
  changePage: (event: MouseEvent<HTMLDivElement>) => void;
  currentPage: number;
};

export default PaginationProps;
