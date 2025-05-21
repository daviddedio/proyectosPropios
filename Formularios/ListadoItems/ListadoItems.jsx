import './ListadoItems.css'
import { useState, useEffect } from 'react'
import { getAllData, editItemState, addItem, deleteItem } from '../../FireBase/conexion'

import { ComponenteCarga } from '../../component/ComponenteCarga/ComponenteCarga'

export const ListadoItems = ({ id }) => {
    const [loadingItems, setloadingItems] = useState(false)
    const [datosItems, setDatosItems] = useState([])
    const [errorItems, setErrorItems] = useState('')

    const [actualizacion, setActualizacion] = useState(false)

    const [nuevoItem, setNuevoItem] = useState('')

    const getItemsForActions = async () => {
        setloadingItems(true)
        try {
            const datos = await getAllData('Items')
            setDatosItems(datos.filter(e => e.idItemAction == id))
        } catch (error) {
            setErrorItems(error)
        } finally {
            setloadingItems(false)
        }
    }

    useEffect(() => { getItemsForActions() }, [actualizacion])

    const actualizarNuevoItem = (e) => {
        setNuevoItem(e.target.value)
    }

    const agregarItem = async () => {
        setloadingItems(true)
        const obj = { idItemAction: id, descripcion: nuevoItem, estado: false }
        const res = await addItem(obj)
        console.log(res.id)
        if (res.id) {
            const newObj = { ...obj, id: res }
            setDatosItems([...datosItems, newObj])
        } else {
            setErrorItems(res)
        }
        setloadingItems(false)
        setNuevoItem('')
    }

    const editarEstadoItem = async ({ value, checked }) => {
        const invertir = checked ? true : false
        const revisionItems = datosItems.map(e => e.id === value ? { ...e, estado: invertir } : e)
        setDatosItems(revisionItems)

        const res = await editItemState(value, invertir)
        if (res != 'ok') {
            setDatosItems(datosItems.map(e => e.id === value ? { ...e, estado: checked } : e))
            setActualizacion(!actualizacion)
            setErrorItems(res)
        }
    }

    const eliminarItem = async (id) => {
        const datosFijos = datosItems
        const datosFiltrados = datosItems.filter(e => e.id != id)
        setDatosItems(datosFiltrados)

        const res = await deleteItem(id)
        if (res != 'ok') {
            setDatosItems(datosFijos)
            setErrorItems(res)
        }
    }

    return (
        <>
            <h2 className='titulo-items-personalizados'>Items de accion</h2>
            <div className="inputPack">
                <div className="form-items">
                    <label htmlFor="items">Cargar item: </label>
                    <div className="input-text">
                        <input type="text" name="items" id="items" value={nuevoItem} onChange={actualizarNuevoItem} />
                        <a onClick={agregarItem}>Add</a>
                    </div>
                </div>
                <ul className='listado-items'>
                    {loadingItems ? <ComponenteCarga /> : datosItems.map((e, i) =>
                        <li key={i}>
                            <p>{e.descripcion}</p>
                            <div className="opciones-items-delete">
                                <input type="checkbox" name="item" id={i} checked={e.estado} value={e.id}
                                    onChange={(e) => editarEstadoItem(e.target)} />
                                <i className="fa-solid fa-trash" onClick={() => eliminarItem(e.id)}></i>
                            </div>
                        </li>)}
                </ul>
            </div>
        </>
    )
}