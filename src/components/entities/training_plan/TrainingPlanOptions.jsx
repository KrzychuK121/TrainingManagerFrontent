import {isUser} from "../../../utils/RoleUtils";
import {Form as RouterForm} from "react-router-dom";
import SubmitButtonIcon from "../../form/SubmitButtonIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar} from "@fortawesome/free-regular-svg-icons";
import {faStar as faStarSolid} from "@fortawesome/free-solid-svg-icons";
import EditButton from "../crud/EditButton";
import DeleteModal from "../crud/DeleteModal";

function TrainingPlanOptions(
    {
        plan,
        setActionData
    }
) {
    const {active, id} = plan;
    return <>
        {
            isUser() && !active && (
                <RouterForm
                    action={`/main/plans/${id}`}
                    method='patch'
                    className='d-inline-block'
                >
                    <SubmitButtonIcon
                        tooltip='Aktywuj'
                        display={<FontAwesomeIcon icon={faStar}/>}
                        hover={<FontAwesomeIcon icon={faStarSolid}/>}
                        className='m-1'
                    />
                </RouterForm>
            )
        }
        <EditButton moveTo={`/main/plans/edit/${id}`}/>
        <DeleteModal
            action={`/main/plans/delete/${id}`}
            setActionData={setActionData}
        />
    </>;
}

export default TrainingPlanOptions;