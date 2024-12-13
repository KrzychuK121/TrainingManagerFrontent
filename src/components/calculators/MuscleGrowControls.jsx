import BodyPartControls from "./BodyPartControls";
import {useState} from "react";
import {Row} from "react-bootstrap";

function MuscleGrowControls(
    {
        bodyParts
    }
) {
    const [checkedValues, setCheckedValues] = useState([]);

    return (
        <>
            <hr/>
            <h2>Trenowane części ciała</h2>
            <p>
                Wybierz części ciała, które chcesz wytrenować.
            </p>
            <Row>
                {
                    Object.entries(bodyParts).map(
                        ([bodyPart, bodyPartDisplay]) => (
                            <BodyPartControls
                                key={bodyPart}
                                bodyPart={bodyPart}
                                bodyPartDisplay={bodyPartDisplay}
                                setCheckedArr={setCheckedValues}
                            />
                        )
                    )
                }
            </Row>
            <hr/>
        </>
    );
}

export default MuscleGrowControls;

export function getMuscleGrowDataFrom(formData) {
    return {};
}