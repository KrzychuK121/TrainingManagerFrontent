import { Col, Form, Pagination, Row } from 'react-bootstrap';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getInjectedParamsUrl } from '../../utils/URLUtils';
import classes from './PaginationEntity.module.css';

function PaginationEntity({pages}) {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const lastPageIndex = pages.totalPages - 1;

    function validatePage(page) {
        if (isNaN(page) || page < 0)
            return 0;
        if (page > lastPageIndex)
            return lastPageIndex;

        return page;
    }

    function changePageHandler(page) {
        const validatedPage = validatePage(page);
        const pathToGo = getInjectedParamsUrl(location.pathname, searchParams, 'page', validatedPage);
        navigate(pathToGo);
    }

    function submittedPageHandler(event) {
        if (event.key !== 'Enter')
            return;

        const page = parseInt(event.currentTarget.value) - 1;
        changePageHandler(page);
    }

    return (
        <>
            <Row className='justify-content-center'>
                <Col sm={4}>
                    <Pagination className='justify-content-center'>
                        <Pagination.First
                            disabled={pages.first}
                            onClick={() => changePageHandler(0)}
                        />
                        <Pagination.Prev
                            disabled={pages.first}
                            onClick={() => changePageHandler(pages.number - 1)}
                        />
                        <Form.Control
                            id='page'
                            name='page'
                            className={classes.searchPage}
                            placeholder='Strona..'
                            onKeyDown={submittedPageHandler}
                        />
                        <Pagination.Next
                            disabled={pages.last}
                            onClick={() => changePageHandler(pages.number + 1)}
                        />
                        <Pagination.Last
                            disabled={pages.last}
                            onClick={() => changePageHandler(lastPageIndex)}
                        />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
}

export default PaginationEntity;