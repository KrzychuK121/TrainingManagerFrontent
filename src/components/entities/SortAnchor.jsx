import { useState } from 'react';
import { Link, useLocation, useNavigation, useSearchParams } from 'react-router-dom';
import { getInjectedParamsUrl } from '../../utils/URLUtils';
import classes from './SortAnchor.module.css';

function getSort(field, ascending) {
    return ascending
        ? field
        : `${field},desc`;
}

function SortAnchor(
    {
        display,
        field
    }
) {
    const navigation = useNavigation();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [ascending, setAscending] = useState(initAscending());
    const [sort, setSort] = useState(getSort(field, ascending));

    function initAscending() {
        const initSort = searchParams.get('sort');
        return initSort != null && initSort.includes(field) && initSort.includes('desc');
    }

    function sortHandler(event) {
        const updatedAscending = !ascending;
        setAscending(updatedAscending);
        setSort(getSort(field, updatedAscending));
    }

    if (navigation.state === 'loading')
        return (
            <span className={classes.sortAnchor}>
                {display}
            </span>
        );

    return (
        <Link
            to={
                field !== undefined && field !== null
                    ? getInjectedParamsUrl(location.pathname, searchParams, 'sort', sort)
                    : location.pathname
            }
            className={classes.sortAnchor}
            onClick={sortHandler}
        >
            {display}
        </Link>
    );
}

export default SortAnchor;