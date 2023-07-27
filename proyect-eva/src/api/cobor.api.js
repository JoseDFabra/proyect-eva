import axios from 'axios';

const puntosApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/v1/edit/point/'
})
export const getAllPoints = () => puntosApi.get('/')
export const createPoint = (point) => puntosApi.post('/', point)
export const deletePoint = (name) => puntosApi.delete(`/${name}/`)


const movimientosApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/v1/edit/movement/'
})
export const getAllMovements = () => movimientosApi.get('/')
export const createMovements = (movement) => movimientosApi.post('/', movement)
export const deleteMovements = (name) => movimientosApi.delete(`/${name}/`)
