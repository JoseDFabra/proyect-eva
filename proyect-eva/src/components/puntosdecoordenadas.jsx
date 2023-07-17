import React,{ useState } from "react";
import "../stylesheets/puntosdecoordenadas.css"
/* import { saveCoordenadas,updateCoordenadas,deleteCoordenadas } from "../services/coordenadasServices"; */
import Button from "./button";
import useFormulario from "../hooks/useformulario";
import {AiOutlineDelete, AiOutlineCloseCircle, AiOutlinePlayCircle } from "react-icons/ai";


function Pcoordenadas(prop){
  const [currentPunto, setcurrentPunto] = useState(undefined);
  const [nameList, setNameList] = useState("");
  const [puntosSelect,setPuntosSelect] = useState([]); 
  const [puntos, setPuntos] = useState([]);
  const [formulario, handleChange, reset] = useFormulario({
    name:'',
    motor1_angle:'',
    motor2_angle:'',
    motor3_angle:'',
    motor4_angle:'',
    motor5_angle:'',
  })
  
  
  const submit = e =>{
    e.preventDefault();
    setPuntosSelect([
      ...puntosSelect,
      formulario,
    ])
    reset();
  }
  
  
  
  /* Esta accion borrala solo el punto seleccionado */
  const deleteThis = (index) =>{
    console.log("Eliminado", index);
    const puntosRestantes = [...puntos]; // Crea una copia de la matriz puntos
    puntosRestantes.splice(index, 1); // Elimina el elemento en el índice especificado
    setPuntos(puntosRestantes); // Actualiza el estado con la nueva matriz sin el elemento eliminado
  }
  
  /* console.log(`Eliminado `, index);
  const puntosRestantes = puntos.splice(index,1);
  setPuntos([...puntosRestantes]); */


  /* Guardar todo */
  function saveAll(puntos){
   const lista = {
    name: nameList,
    gripper: false,
    ...puntos.reduce((acc, n, i) => {
      acc[`point${i+1}`] = n.name;
      return acc;
    }, {})
   }

   console.log("Saved: ", lista);
  }


  /* Esta accion dara play a solo un punto */
  const playThis = (p) =>{
    const enviarPunto={
      comands:"play",
      type:"point",
      name:p.name
    }
    console.log("ejecutando punto:  ",enviarPunto);
    /* saveCoordenadas(p) */
  }
  
  /* esta accion borrala la listaq que llevamos guardando en su totalidad */
  const deleteAll = () =>{
    const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar toda la lista?');
    if (confirmDelete) {setPuntos([]);}
  }
    
  console.log(puntos);
  
    return(
    <>
    <div className="container-card fijado">
      <h2 className="titulo-card" >Puntos Coordenados</h2>
      <form className="container-form" onSubmit={submit} >

        <div className="container-input ">
          <label htmlFor="name">Name: </label>
          <input 
          type="text" 
          name="name" 
          id="name" 
          placeholder="Max 10 Char"
          title="Maximo 10 caracteres"
          autoComplete="off"
          maxLength={10}
          required
          className="input-coordenada escribirname" 
          value={formulario.name} 
          onChange={handleChange}/>
        </div>

        <div className="container-input">
          <label htmlFor="motor1_angle">motor 1 angle: </label>
          <input 
          type="number" 
          name="motor1_angle" 
          id="motor1_angle" 
          min={-125} max={125} 
          className="input-coordenada" 
          value={formulario.motor1_angle} 
          onChange={handleChange}/>
        </div>

        <div className="container-input">
          <label htmlFor="coordenada2">motor 2 angle: </label>
          <input 
           type="number" 
            name="motor2_angle" 
            id="motor2_angle" 
            min={-125} max={125} 
            className="input-coordenada"
            value={formulario.motor2_angle} 
            onChange={handleChange}
          />
        </div>

        <div className="container-input">
          <label htmlFor="motor3_angle">motor 3 angle: </label>
          <input 
            type="number" 
            name="motor3_angle" 
            id="motor3_angle"
            min={-125} max={125} 
            className="input-coordenada"
            value={formulario.motor3_angle} 
            onChange={handleChange}
          />
        </div>

        <div className="container-input">
          <label htmlFor="motor4_angle">motor 4 angle: </label>
          <input 
            type="number" 
            name="motor4_angle" 
            id="motor4_angle"
            min={-125} max={125} 
            className="input-coordenada"
            value={formulario.motor4_angle} 
            onChange={handleChange}
          />
        </div>
        <div className="container-input">
          <label htmlFor="motor5_angle">motor 5 angle: </label>
          <input 
          type="number" 
          name="motor5_angle" 
          id="motor5_angle" 
          min={-125} max={125} 
          className="input-coordenada"
          value={formulario.motor5_angle} 
          onChange={handleChange}
          />
        </div>
        <div className="botton-form">
          <Button text="Guardar punto"/>
         
        </div>
      </form>
      <div className="footer-card-select">
        <select
        className="select"
        defaultValue={""}
        name="puntos" 
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setcurrentPunto(null); // o cualquier otro valor adecuado para representar "Seleccionar punto"
            console.log(puntosSelect);

          } else {
            const p = JSON.parse(value);
            setcurrentPunto(p);
          }
        }} >
          <option value={""}>Seleccionar punto</option>
          {puntosSelect.map((p,i) =>
            <option className="lista-li" key={i} value={JSON.stringify(p)} >
              <p>{`${p.name}: `}</p>
              <div className="pld" >
                {
                `[${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`
                }
              </div>
            </option>)}
          </select>
          <div className="opcion-seleccionada">
            opcion seleccionada:  
            <b>
              {currentPunto ? currentPunto.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Agregar a la lista" onClick={
            ()=>{
              if(currentPunto){
                setPuntos([...puntos,currentPunto])
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button text="Borrar punto" onClick={
              () =>{
                if(currentPunto){
                  const nuevosPuntosSelect = puntosSelect.filter(punto => punto.name !== currentPunto.name);
                  setPuntosSelect(nuevosPuntosSelect);
                }
              } 
            } />
            <Button text="Borrar todo" onClick={
              ()=>{
                const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar todas las opciones de puntos?');
                if (confirmDelete) {setPuntosSelect([]);}
              }
            } />
          </div>
      </div>

    </div>
    <div className="lista-guardada">
      <h2 className="titulo-card" >Lista De Puntos</h2>
      
      {/* esto es lo que se va a mostrar en el fron(tarjetas de puntos) */}
      
      <ul className="container-li" >
        <div className="nombrar" >
          <label>Nombrar lista:</label><input type="text" required autoComplete="off" placeholder="Max 10 Char" maxLength={10} className="input-coordenada escribirname" name="" id="" onChange={(e)=>{setNameList(e.target.value)}}/>
          <AiOutlineDelete onClick={deleteAll} title="Borrar toda la secuencia" className="delete-all-lista" />
        </div>
        {puntos.map((p,index) =>
        <li className="lista-li" key={index} >
          <div className="separacion-play">
            <AiOutlinePlayCircle className="play-punto" onClick={()=>{playThis(p)}} /> 
          </div>
          <div className="pld" >
            <div className="separacion-name">
              <b>{p.name}</b>
            </div>
            <div className="separacion-coordenada">
              {
                `[${p.motor1_angle}],
                [${p.motor2_angle}],
                [${p.motor3_angle}],
                [${p.motor4_angle}],
                [${p.motor5_angle}]`
              }
            </div>
          </div>
          <div className="separacion-delete">
            <AiOutlineCloseCircle className="delete-punto" onClick={()=>{deleteThis(index)}} /> 
          </div>
        </li>)}
      </ul>
      <div className="footer-card">
        <Button text="Guardar lista" onClick={()=>{saveAll(puntos)}} />

        
      </div>
      <div className="footer-card-select">
        <select
        className="select"
        defaultValue={""}
        name="puntos" 
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setcurrentPunto(null); // o cualquier otro valor adecuado para representar "Seleccionar punto"
            console.log(puntosSelect);

          } else {
            const p = JSON.parse(value);
            setcurrentPunto(p);
          }
        }} >
          <option value={""}>Seleccionar punto</option>
          {puntosSelect.map((p,i) =>
            <option className="lista-li" key={i} value={JSON.stringify(p)} >
              <p>{`${p.name}: `}</p>
              <div className="pld" >
                {
                `[${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`
                }
              </div>
            </option>)}
          </select>
          <div className="opcion-seleccionada">
            opcion seleccionada:  
            <b>
              {currentPunto ? currentPunto.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Agregar a la lista" onClick={
            ()=>{
              if(currentPunto){
                setPuntos([...puntos,currentPunto])
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button text="Borrar punto" onClick={
              () =>{
                if(currentPunto){
                  const nuevosPuntosSelect = puntosSelect.filter(punto => punto.name !== currentPunto.name);
                  setPuntosSelect(nuevosPuntosSelect);
                }
              } 
            } />
            <Button text="Borrar todo" onClick={
              ()=>{
                const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar todas las opciones de puntos?');
                if (confirmDelete) {setPuntosSelect([]);}
              }
            } />
          </div>
      </div>

    </div>  
    <div className="movimientos-guardados">
      <h2 className="titulo-card" >Lista De Movimientos</h2>

    </div>
      
    </>

  );
}
export default Pcoordenadas;
