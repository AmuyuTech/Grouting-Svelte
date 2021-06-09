import { set } from "lodash";
import {readable} from "svelte/store";
import {Clientes$, Creditos$, Despachos$, Facturas$, Gastos$, Productos$, ProductosB$, Usuarios$, Ventas$} from "./firebaseAPI"


export const Productos = readable([], set => {
    Productos$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc =>  {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
        set(data)
    })
})
export const ProductosB = readable([], set => {
    ProductosB$.onSnapshot(snapshot => {
        let data = []
        let payload = snapshot.data() 
        Object.keys(payload).forEach(p => {
            data.push({
                id: p,
                ...payload[p]
            })
        })
    })
})
/*
export const Clientes = readable([], set => {
    Clientes$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc =>  {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
        set(data)
    }, e => console.error(e))
})
export const Usuarios = readable([], set => {
    Usuarios$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
    })
})
export const Creditos = readable([], set => {
    Creditos$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
    })
})
export const Despachos = readable([], set => {
    Despachos$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
    })
})
export const Facturas = readable([], set => {
    Facturas$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
    })
})
export const Gastos = readable([], set => {
    Gastos$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
    })
})
export const Ventas = readable([], set => {
    Ventas$.onSnapshot(snapshot => {
        let data = []
        snapshot.forEach(doc => {
            data.push({
                ...doc.data(),
                id: doc.id
            })
        })
    })
})*/