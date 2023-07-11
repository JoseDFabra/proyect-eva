import React,{ useState } from "react";
import "../stylesheets/puntosdecoordenadas.css"
import Button from "./button";
import useFormulario from "../hooks/useformulario";
import { AiOutlinePlaySquare, AiOutlineCloseSquare } from "react-icons/ai";


function Pcoordenadas(props){
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

    
    console.log(puntos);
    
    return(
    <>
    <div className="container-card fijado">
      <h2 className="titulo-card" >Aqui va el titulo</h2>
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
      <h2 className="titulo-card" >Aqui va el titulo</h2>
      
      <ul className="container-li" >
        {puntos.map(p =>
        <li className="lista-li" key={p.name} >
          <p>{`name: ${p.name}`}</p>
          <AiOutlinePlaySquare/> 
          {`[${p.motor1_angel}],
            [${p.motor2_angel}],
            [${p.motor3_angel}],
            [${p.motor4_angel}],
            [${p.motor5_angel}]`}
            <AiOutlineCloseSquare/> 
          </li>)}
      </ul>
      <Button>Guardar secuencia</Button>
    </div>  
      
    </>

  );
}
export default Pcoordenadas;