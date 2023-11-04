import { useParams } from 'react-router-dom';
import { ResultsTable } from '../ResultsTable/ResultsTable';
import { Pagination } from '../pagination/Pagination';
import AppRoutesProps from '../../types/AppRoutesProps';

export const Page = ({ props }: { props: AppRoutesProps }) => {
  const { number } = useParams();

  return (
    <>
      <ResultsTable
        offset={props.offset}
        searchValue={props.searchValue}
        searchingStatus={props.searchingStatus}
      />
      ;
      {props.searchValue || localStorage.getItem('searchQuery') ? null : (
        <Pagination
          currentPage={number ? +number : 0}
          pokemonsData={props.pokemonsData}
          setOffset={props.setOffset}
          setCurrentPage={props.setCurrentPage}
        />
      )}
    </>
  );
};
