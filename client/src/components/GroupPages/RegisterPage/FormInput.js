import { useState } from 'react'
import './formInput.css'

function FormInput(props) {
    const [focused, setFocused] = useState(false);
    const {errorMessage,onChange, ...inputProps} = props;
    
    function handleFocus(e){
        setFocused(true)
    }
    return(
        <div className="formInput">
            <input
                {...inputProps}
                onChange={onChange}
                onBlur={handleFocus}
                focused={focused.toString()}
            />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput;