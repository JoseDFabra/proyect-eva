import axios from 'axios';



//command play api
const PlayApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/v1/command/'
})
export const playpoint = (point) => PlayApi.post('/', point)

//points api
const puntosApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/v1/edit/point'
})
export const getAllPoints = () => puntosApi.get('/')
export const createPoint = (point) => puntosApi.post('/', point)
export const deletePoint = (name) => puntosApi.delete(`/${name}/`)

//movimientos api
const movimientosApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/v1/edit/movement'
})
export const getAllMovements = () => movimientosApi.get('/')
export const createMovements = (movement) => movimientosApi.post('/', movement)
export const deleteMovements = (name) => movimientosApi.delete(`/${name}/`)


//sequence service
const sequenceApi = axios.create({
  baseURL:'http://127.0.0.1:8000/api/v1/edit/sequence'
})
export const getAllSequences = () => sequenceApi.get('/')
export const createsequence = (sequence) => sequenceApi.post('/', sequence)
export const deletesequence = (name) => sequenceApi.delete(`/${name}/`)

