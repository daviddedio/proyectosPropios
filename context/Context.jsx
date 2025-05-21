import { useContext, createContext, useState } from "react";

export const GlobalContext = createContext({openModal:false, setOpenModal: ()=>null})

export const GlobalProvider = ({children}) => {
    /*varible locales*/
    const[openModal, setOpenModal] = useState(false)
    const [componente, setComponente] = useState('')
    return( 
        <GlobalContext.Provider value={{openModal, setOpenModal, componente, setComponente}}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    const context = useContext(GlobalContext)
    return context
}