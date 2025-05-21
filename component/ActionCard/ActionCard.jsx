import './ActionCard.css'
import { useGlobalContext } from '../../context/Context'
import { CreateUpdateForm } from '../../Formularios/CreateUpdateForm/CreateUpdateForm'
import { useEffect, useState } from 'react'
import { DeleteAction } from '../../Formularios/DeleteAction/DeleteAction'
import { ListadoItems } from '../../Formularios/ListadoItems/ListadoItems'

export const ActionCard = ({ id, titulo, descripcion, plazo, proyecto, estado, items, funcion }) => {

    const { setOpenModal, setComponente } = useGlobalContext()

    const mostrarModal = (reactComponente) => {
        setComponente(reactComponente)
        setOpenModal(true)
    }

    const [vigencia, setVigencia] = useState('')

    const calculosVigencia = () => {

        const fechaActual = new Date().getTime()
        const fechaVencimiento = new Date(plazo).getTime()
        const diasVencimiento = fechaVencimiento - 2592000000

        if (fechaActual > fechaVencimiento) {
            setVigencia('late')
            return
        }
        if (fechaActual > diasVencimiento) {
            setVigencia('closeLate')
            return
        }
        if (fechaActual < fechaVencimiento) {
            setVigencia('inTime')
            return
        }
    }

    useEffect(() => { calculosVigencia() }, [])

    const startDrag = (e, id, origen) => {
        const datos = { origen, id }
        e.dataTransfer.setData('dataTransf', JSON.stringify(datos))
    }

    //card-header inTime Late
    return (
        <div className='card' draggable onDragStart={e => startDrag(e, id, estado)}>
            <div className={`card-header ${vigencia}`}>
                <i className="fa-solid fa-pen-to-square toolTipConteiner" onClick={() => mostrarModal(<CreateUpdateForm accion={"Actualizar"} Titulo={titulo} Descripcion={descripcion} Plazo={plazo} Proyecto={proyecto} Estado={estado} Items={items} Id={id} funcion={funcion} />)}>
                    <span className='toolTip'>Editar accion</span>
                </i>
                <i className="fa-solid fa-list toolTipConteiner" onClick={() => mostrarModal(<ListadoItems id={id}/>)}>
                    <span className='toolTip'>Editar Items</span>
                </i>
                <i className="fa-solid fa-trash toolTipConteiner" onClick={() => mostrarModal(<DeleteAction nro={id} funcion={funcion} titulo={titulo} />)}>
                    <span className='toolTip'>Eliminar accion</span>
                </i>
                <i className="fa-solid fa-arrows-up-down-left-right toolTipConteiner">
                    <span className='toolTip'>Mover</span>
                </i>
            </div>
            <div className="card-body">
                <h3>{titulo}</h3>
            </div>
        </div>
    )
}