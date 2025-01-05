import {useEffect, useState} from 'react';
import {Link, useLocation, useNavigation, useSearchParams} from 'react-router-dom';
import {getInjectedParamsUrl} from '../../../utils/URLUtils';
import classes from './SortAnchor.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDownShortWide, faArrowUpShortWide} from "@fortawesome/free-solid-svg-icons";

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
    const [sortIcon, setSortIcon] = useState(<FontAwesomeIcon icon={faArrowUpShortWide} />);
    const [ascending, setAscending] = useState(initAscending());

    const [sort, setSort] = useState(getSort(field, ascending));

    useEffect(() => {
        setSortIcon(getSortIcon());
    }, [ascending]);

    function getSortIcon() {
        return ascending
            ? <FontAwesomeIcon icon={faArrowUpShortWide} />
            : <FontAwesomeIcon icon={faArrowDownShortWide} />;
    }

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
            {display} {sortIcon}
        </Link>
    );
}

export default SortAnchor;