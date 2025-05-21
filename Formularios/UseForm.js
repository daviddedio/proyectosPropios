import { useState } from "react"

export const UseForm = (initialForm = {}) => {

    const [formState, setFormState] = useState(initialForm)

    const onInputTextChange = ({target})=>{
        const {name, value} = target
        setFormState(
            {...formState,[name]:value}
        )
        console.log(formState)
    }
    return{
        formState, onInputTextChange, setFormState
    }
}
