import './PaginationStyle.scss';
import PaginationProps from '../../types/PaginationProps';
import { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Pagination = (props: PaginationProps) => {
  const navigate = useNavigate();
  function changePage(event: MouseEvent<HTMLDivElement>) {
    if (
      event.currentTarget.classList.contains('button_prev-page') &&
      props.currentPage > 1
    ) {
      props.setCurrentPage((prevValue) => prevValue - 1);
      navigate(`/page/${props.currentPage - 1}`);
      props.setOffset((prevValue) => prevValue - 16);
    } else if (
      event.currentTarget.classList.contains('button_next-page') &&
      props.currentPage < Math.ceil(props.pokemonsData.length / 16)
    ) {
      props.setCurrentPage((prevValue) => prevValue + 1);
      navigate(`/page/${props.currentPage + 1}`);
      props.setOffset((prevValue) => prevValue + 16);
    }
  }
  return (
    <div className="pagination">
      <div className="button button_prev-page" onClick={changePage}>
        <Link to={`/page/${props.currentPage}`}></Link>
        &larr;
      </div>
      <div className="button button_current-page">{props.currentPage}</div>
      <div className="button button_next-page" onClick={changePage}>
        <Link to={`/page/${props.currentPage}`}></Link>
        &rarr;
      </div>
    </div>
  );
};
