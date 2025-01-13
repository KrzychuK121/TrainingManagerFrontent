import SortAnchor from "../crud/SortAnchor";
import classes from './ExerciseSortPanel.module.css';
import {Col, Form, Row} from "react-bootstrap";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {createQueryParam, getFilteredQueryString} from "../../../utils/URLUtils";
import {useEffect, useRef} from "react";

function ExerciseSortFilterPanel(
    {
        filteredName,
        setFilteredName
    }
) {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const typingTimeoutRef = useRef(null);

    useEffect(
        () => {
            if(filteredName)
                return;
            const filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);
            navigate(`${location.pathname}${filteredQueryString}`);
        }, [filteredName]
    )

    async function handleSearchExercises(event) {
        const searchName = event.target.value;
        setFilteredName(searchName);
        if(!searchName || searchName.trim().length < 0)
            return;

        let filteredQueryString = getFilteredQueryString(searchParams, ['page', 'sort', 'size']);
        filteredQueryString = createQueryParam('filter', searchName, filteredQueryString);

        if (typingTimeoutRef.current)
            clearTimeout(typingTimeoutRef.current);

        typingTimeoutRef.current = setTimeout(async () => {
            navigate(`${location.pathname}${filteredQueryString}`);
        }, 500);
    }

    // Cleanup function when the component unmounts
    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

    return (
        <>
            <Row
                className={`${classes.sortFilterPanel} p-4 justify-content-between align-items-center`}
            >
                <Col className={classes.sortPanel}>
                    <SortAnchor
                        display='Nazwa'
                        field='name'
                    />

                    <SortAnchor
                        display='Opis'
                        field='description'
                    />

                    <SortAnchor
                        display='Część ciała'
                        field='bodyPart'
                    />

                    <SortAnchor
                        display='Spalane kalorie'
                        field='defaultBurnedKcal'
                    />

                    <SortAnchor display='Zresetuj widok'/>
                </Col>
                <Col sm={3} className='align-items-end my-2'>
                    <Form.Control
                        placeholder='Nazwa...'
                        value={filteredName}
                        onChange={handleSearchExercises}
                    />
                </Col>
            </Row>
        </>
    );
}

export default ExerciseSortFilterPanel;