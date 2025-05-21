import './DragBody.css'
import { Column } from '../Column/Column'
import { ActionCard } from '../ActionCard/ActionCard'
import { getAllData } from '../../FireBase/conexion'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/Context'
import { CreateUpdateForm } from '../../Formularios/CreateUpdateForm/CreateUpdateForm'
import { NavBar } from '../NavBar/NavBar'

/*Estados > To do - En curso - Finalizado */

export const DragBody = () => {
    const { setOpenModal, setComponente } = useGlobalContext()

    const mostrarModal = (reactComponente) => {
        setComponente(reactComponente)
        setOpenModal(true)
    }

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [reload, setReload] = useState(false)
    const [opcionProyecto, setOptionProyecto] = useState([])
    const [opcionDato, setOpcionDato] = useState('')

    const getData = async (filtros) => {
        setLoading(true)
        try {
            const datos = await getAllData('itemAction')
            setData(datos.filter(e => e.proyecto === filtros))
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const setProyect = async () => {
        try {
            const datos = await getAllData('Proyectos')
            setOptionProyecto(datos)
        } catch (error) {
            setError(error.message)
        }
    }

    const actualizarItemsActions = async (value) => {
        console.log(opcionDato)
        setOpcionDato(value)
        await getData(value)
    }

    useEffect(() => {
        setProyect()
        actualizarItemsActions(opcionDato)
    }, [reload])

    return (
        <>
            <NavBar funcionAddItem={() => { mostrarModal(<CreateUpdateForm accion={"Nuevo"} Titulo={""} Descripcion={""} Plazo={""} Proyecto={""} Estado={""} Items={""} Id={""} funcion={[setReload, reload]} />) }}>
                <select name="proyectos" id="proyectos" onChange={(e) => actualizarItemsActions(e.target.value)}>
                    {
                        opcionProyecto && opcionProyecto.map((e, i) => <option key={i} value={e.nombre} >{e.nombre}</option>)
                    }
                </select>
            </NavBar>
            <hr />
            <div className="drag-n-drop">
                <Column nombreColumn={"Para hacer"} id={1} datos={data} funcion={setData}>
                    {loading ? <p>cargando</p> : data.map((e, i) => e.estado == "Para hacer" && <ActionCard key={i} id={e.id} titulo={e.titulo} descripcion={e.descripcion} plazo={e.plazo} proyecto={e.proyecto} estado={e.estado} items={e.items} funcion={[setReload, reload]} />)}
                </Column>

                <Column nombreColumn={"En proceso"} id={2} datos={data} funcion={setData}>
                    {loading ? <p>cargando</p> : data.map((e, i) => e.estado == "En proceso" && <ActionCard key={i} id={e.id} titulo={e.titulo} descripcion={e.descripcion} plazo={e.plazo} proyecto={e.proyecto} estado={e.estado} items={e.items} funcion={[setReload, reload]} />)}
                </Column>

                <Column nombreColumn={"Finalizados"} id={3} datos={data} funcion={setData}>
                    {loading ? <p>cargando</p> : data.map((e, i) => e.estado == "Finalizados" && <ActionCard key={i} id={e.id} titulo={e.titulo} descripcion={e.descripcion} plazo={e.plazo} proyecto={e.proyecto} estado={e.estado} items={e.items} funcion={[setReload, reload]} />)}
                </Column>
            </div>
        </>
    )
}