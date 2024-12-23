import BodyPartControls from "./BodyPartControls";
import {Row} from "react-bootstrap";
import {filterAndCollectProps} from "../../../../utils/EntitiesUtils";

function MuscleGrowControls(
    {
        bodyParts,
        setCheckedArr
    }
) {
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
                                setCheckedArr={setCheckedArr}
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
    let bodyParts = formData.getAll('bodyParts');
    const formDataObj = Object.fromEntries(formData);
    const toReturn = {
        bodyPartWorkoutStatistics: {}
    };

    bodyParts.forEach(
        bodyPart => toReturn.bodyPartWorkoutStatistics[bodyPart] = filterAndCollectProps(formDataObj, `${bodyPart}-`)
    );
    return toReturn;
}