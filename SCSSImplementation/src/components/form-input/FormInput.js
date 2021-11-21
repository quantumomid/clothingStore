import './FormInput.scss'

export default function FormInput ({ handleChange, label, ...otherInputProps }){

    return(
        <div className="group">
            <input className="form-input" onChange={handleChange} {...otherInputProps} />
            {label ? (
                <label className={`${otherInputProps.value.length ? 'shrink' : ''} form-input-label`} >
                    {label}
                </label>
                ) : null
            }
        </div>
    )
}