import { useSelector, useDispatch  } from 'react-redux';
import { useState, useEffect } from 'react';
import { actionCreator } from '../../store/actions';
import { State } from '../../store/root-reducer';
import { SortType } from '../../consts';

function Sort(): JSX.Element {
  const [sortMenuIsOpen, setSortMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const currentSortType = useSelector((state: State): string => state.DATA.currentSortType);
  const sortTypes = Object.values(SortType);

  const handleSortClick = (sort: string) => {
    dispatch(actionCreator.changeSortType(sort));
  };

  useEffect(() => {
    const handleClick = () => {
      if (sortMenuIsOpen) {
        setSortMenuIsOpen(false);
      }
    };

    const handleEscPress = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape' && sortMenuIsOpen) {
        setSortMenuIsOpen(false);
      }
    };

    if (sortMenuIsOpen) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEscPress);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscPress);
    };
  });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span data-testid = "sort" className="places__sorting-type" tabIndex={0} onClick={() => { setSortMenuIsOpen(!sortMenuIsOpen); }} >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {sortMenuIsOpen &&
      <ul data-testid = "sort-dropdown" className="places__options places__options--custom places__options--opened">
        {sortTypes.map((sortType) => (
          <li className={`places__option ${currentSortType === sortType ? 'places__option--active' : ''}`} tabIndex={0} key={sortType} onClick={() => {
            handleSortClick(sortType);
          }}
          >{sortType}
          </li>
        ))}
      </ul>}
    </form>
  );
}

export default Sort;
