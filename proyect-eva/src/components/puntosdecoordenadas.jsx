import React,{ useState } from "react";
import "../stylesheets/puntosdecoordenadas.css"
import { saveCoordenadas,updateCoordenadas,deleteCoordenadas } from "../services/coordenadasServices";
import Button from "./button";
import useFormulario from "../hooks/useformulario";
import {AiOutlineDelete, AiOutlineCloseCircle, AiOutlinePlayCircle } from "react-icons/ai";
import Buttonsend from './buttonsend';


function Pcoordenadas(prop){
  const [puntos, setPuntos] = useState([]);

  const [formulario, handleChange, reset] = useFormulario({
    name:'',
    motor1_angel:'',
    motor2_angel:'',
    motor3_angel:'',
    motor4_angel:'',
    motor5_angel:'',
  })
  
  const submit = e =>{
    e.preventDefault();
    setPuntos([
      ...puntos,
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


  function saveAll(){
    console.log("Se guardara todo")
  }


  /* Esta accion dara play a solo un punto */
  const playThis = (p) =>{
    const enviarPunto={
      comands:"play",
      type:"point",
      name:p.name
    }
    console.log("ejecutar:  ",enviarPunto);
    saveCoordenadas(p)
  }
  
  /* esta accion borrala la listaq que llevamos guardando en su totalidad */
  const deleteAll = () =>{
    const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar todo?');
    if (confirmDelete) {setPuntos([]);}
  }
    
  console.log(puntos);
    
    return(
    <>
    <div className="container-card fijado">
      <h2 className="titulo-card" >Puntos Coordenados</h2>
      <form className="container-form" onSubmit={submit} >

        <div className="container-input">
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
          className="input-coordenada" 
          value={formulario.name} 
          onChange={handleChange}/>
        </div>

        <div className="container-input">
          <label htmlFor="motor1_angel">motor 1 angel: </label>
          <input 
          type="number" 
          name="motor1_angel" 
          id="motor1_angel" 
          min={-125} max={125} 
          className="input-coordenada" 
          value={formulario.motor1_angel} 
          onChange={handleChange}/>
        </div>

        <div className="container-input">
          <label htmlFor="coordenada2">motor 2 angel: </label>
          <input 
           type="number" 
            name="motor2_angel" 
            id="motor2_angel" 
            min={-125} max={125} 
            className="input-coordenada"
            value={formulario.motor2_angel} 
            onChange={handleChange}
          />
        </div>

        <div className="container-input">
          <label htmlFor="motor3_angel">motor 3 angel: </label>
          <input 
            type="number" 
            name="motor3_angel" 
            id="motor3_angel"
            min={-125} max={125} 
            className="input-coordenada"
            value={formulario.motor3_angel} 
            onChange={handleChange}
          />
        </div>

        <div className="container-input">
          <label htmlFor="motor4_angel">motor 4 angel: </label>
          <input 
            type="number" 
            name="motor4_angel" 
            id="motor4_angel"
            min={-125} max={125} 
            className="input-coordenada"
            value={formulario.motor4_angel} 
            onChange={handleChange}
          />
        </div>
        <div className="container-input">
          <label htmlFor="motor5_angel">motor 5 angel: </label>
          <input 
          type="number" 
          name="motor5_angel" 
          id="motor5_angel" 
          min={-125} max={125} 
          className="input-coordenada"
          value={formulario.motor5_angel} 
          onChange={handleChange}
          />
        </div>
        <div className="botton-form">
          <Button>Guardar punto</Button>
        </div>
      </form>
    </div>
    <div className="lista-guardada">
      <h2 className="titulo-card" >Lista De Puntos</h2>
      
      {/* esto es lo que se va a mostrar en el fron(tarjetas de puntos) */}
      <ul className="container-li" >
        {puntos.map((p,index) =>
        <li className="lista-li" key={p.name} >
          <p>{`name: ${p.name}`}</p>
          <div className="pld" >
            <AiOutlinePlayCircle className="play-punto" onClick={()=>{playThis(p)}} /> 
            {
             `[${p.motor1_angel}],
              [${p.motor2_angel}],
              [${p.motor3_angel}],
              [${p.motor4_angel}],
              [${p.motor5_angel}]`
            }
            <AiOutlineCloseCircle className="delete-punto" onClick={()=>{deleteThis(index)}} /> 
          </div>
        </li>)}
      </ul>
      <div className="footer-card">
        <Buttonsend textbutton='Guardar Lista' onClick={saveAll} />
        <AiOutlineDelete onClick={deleteAll} title="Borrar toda la secuencia" className="delete-all-lista" />
      </div>
    </div>  
      
    </>

  );
}
export default Pcoordenadas;
