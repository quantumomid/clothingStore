// import './FormInput.scss'

import { FormInputContainer, FormInputLabel, GroupContainer } from "./formInputStyles";

const FormInput =  ({ handleChange, label, ...otherInputProps }) => (
    <GroupContainer>
        <FormInputContainer className="form-input" onChange={handleChange} {...otherInputProps} />
        {label ? (
            <FormInputLabel className={`${otherInputProps.value.length ? 'shrink' : ''}`} >
                {label}
            </FormInputLabel>
            ) : null
        }
    </ GroupContainer>
)

export default FormInput;

{/* <label className={`${otherInputProps.value.length ? 'shrink' : ''} form-input-label`} >
{label}
</label> */}