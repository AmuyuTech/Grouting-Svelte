import {readable} from "svelte/store";
import {Clientes$, Productos$} from "./firebaseAPI"


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