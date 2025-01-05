export const DOMAIN = 'http://localhost:8080/api';

export const EDIT_SUCCESS = 'edit-success';
export const DELETE_SUCCESS = 'delete-success';

export const EDIT_ACCESS_DENIED = 'edit-access-denied';

const PREVIOUS_PATH_KEY = 'previousPathKey';

export function getIdPath(params) {
    return params.id
        ? `/${params.id}`
        : '';
}

export function setGoBackPath() {
    const location = window.location;
    const fullPath = `${location.pathname}${location.search}${location.hash}`;
    sessionStorage.setItem(PREVIOUS_PATH_KEY, fullPath);
}

export function getGoBackPath() {
    let backPath = sessionStorage.getItem(PREVIOUS_PATH_KEY);
    sessionStorage.removeItem(PREVIOUS_PATH_KEY);
    if(
        !backPath
        || backPath.includes('login')
        || backPath.includes('logout')
        || backPath.includes('register')
    )
        backPath = '/main';
    return backPath;
}

/**
 * This function formats `param` with `paramValue` into query string and concatenating `initValue` before if provided.
 *
 * @param param query parameter (e.g. 'sort')
 * @param paramValue value of query parameter (e.g. name,desc)
 * @param initValue query string with other parameters or null if first query param should be created
 *
 * @returns {string} Beginning of query string or formatted query string with new values.
 */
export function createQueryParam(param, paramValue, initValue = null) {
    if (param === null || paramValue === null)
        return initValue
            ? initValue
            : '';
    return initValue
        ? `${initValue}&${param}=${paramValue}`
        : `?${param}=${paramValue}`;
}

/**
 * This function is responsible for returning query parameters of current request
 * with changed value for `param` with custom `paramValue`.
 *
 * @param param query parameter (e.g. 'sort')
 * @param paramValue value of query parameter (e.g. name,desc)
 * @param searchParams value of `useSearchParams()` hook from `react-router-dom`
 *
 * @returns {string} Query string (e.g. '?sort=description&page=1')
 */
export function injectQueryParam(searchParams, param, paramValue) {
    let searchParamString = '';

    if (searchParams.size === 0)
        return createQueryParam(param, paramValue);

    for (const [searchParam, searchParamValue] of searchParams.entries()) {
        if (searchParam === param) {
            searchParamString = createQueryParam(param, paramValue, searchParamString);
            continue;
        }

        searchParamString = createQueryParam(searchParam, searchParamValue, searchParamString);
    }

    if (!searchParams.has(param))
        searchParamString = createQueryParam(param, paramValue, searchParamString);

    return searchParamString;
}

/**
 * This function is responsible for creating filtered query string (e.g. '?sort=description&page=1') including
 * only `acceptableParams`.
 *
 * @param searchParams value of `useSearchParams()` hook from `react-router-dom` or from `new URL(request.url)` object
 * @param acceptableParams array of params from `searchParams` that should be used to create query string
 *
 * @returns {string} Query string (e.g. '?sort=description&page=1') with only `acceptableParams`.
 */
export function getFilteredQueryString(searchParams, acceptableParams) {
    let searchParamString = '';

    if (searchParams.size === 0)
        return '';

    for (const [searchParam, searchParamValue] of searchParams.entries()) {
        if (!acceptableParams.includes(searchParam))
            continue;
        searchParamString = createQueryParam(searchParam, searchParamValue, searchParamString);
    }

    return searchParamString;
}

/**
 * This method is responsible for returning full path for current request with injected values.
 *
 * @param pathname current path that needs injected params values (`useLocation().pathname` from `react-router-dom`)
 * @param param query parameter (e.g. 'sort')
 * @param paramValue value of query parameter (e.g. name,desc)
 * @param searchParams value of `useSearchParams()` hook from `react-router-dom`
 *
 * @returns {string} Full URL string with injected query params
 * @see injectQueryParam
 */
export function getInjectedParamsUrl(pathname, searchParams, param, paramValue) {
    return `${pathname}${injectQueryParam(searchParams, param, paramValue)}`;
}
