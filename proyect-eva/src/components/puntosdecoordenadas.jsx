import React,{ useEffect, useState } from "react";
import "../stylesheets/puntosdecoordenadas.css"
import Button from "./button";
import useFormulario from "../hooks/useformulario";
import {AiOutlineCloseCircle,AiOutlineDelete, AiOutlinePlayCircle, AiOutlineUndo } from "react-icons/ai";
import { ListaPuntos } from "../models/ListaPuntos";
import { Sequence } from "../models/Sequence";
import { getAllPoints, createPoint, deletePoint, getAllMovements, createMovements, deleteMovements, getAllSequences, createsequence, deletesequence } from "../api/cobot.api";
import { notifier } from "../services/notifier";


function Pcoordenadas(prop){

  //form control
  const [formulario, handleChange, reset] = useFormulario({
    name:'',
    motor1_angle:'',
    motor2_angle:'',
    motor3_angle:'',
    motor4_angle:'',
    motor5_angle:'',
  })


  
  //puntos
    //puntos de select
  const [pointsOptions,setpointsOptions] = useState([]); //lista de puntos
    //punto seleccionado del select
  const [currentPunto, setcurrentPunto] = useState(undefined);// 
  
  
  //movimientos
    //lista de puntos
  const [puntos, setPuntos] = useState([]);
    //puntos del select
  const [listsOptions, setListOptions] = useState([]); // 
    //punto seleccionado del select
  const [currentList, setCurrentList] = useState(undefined); //
    // nombre de la lista de movimientos
  const [nameList, setNameList] = useState("");//
  
  
  //sequencias
    //lista de movimientos
  const [movementsList, setMovementsList] = useState([]); //
    //nombre al momento de guardar la secuencia
  const [sequenceName, setSequenceName] = useState([]);
    //lista de secuencias actuales - select
  const [sequenceList, setSequenceList] = useState([]);
    //secuencia actual seleccionada.
  const [currentSequences, setCurrentSequences] = useState(undefined); //


 //---------------------------------------------- v2 points -----------------------------
  useEffect(()=>{
    async function loadPointsAndMovements(){
      const pointsres = await getAllPoints()
      setpointsOptions(pointsres.data);

      const movementsres = await getAllMovements()
      setListOptions(movementsres.data);

      const sequencesres = await getAllSequences();
      setSequenceList(sequencesres)
    }
      //console.log(res);
    loadPointsAndMovements();
  },[])
  
  const submit = async e =>{
    e.preventDefault();
    //setpointsOptions([...pointsOptions,formulario,])
    await createPoint(formulario)
    
    // toast.success("Punto Creado",{
    //   position:"bottom-right",
    //   style: {
    //     background: "#f8f8f8",
    //     color: "#000"
    //   }
    // });
    notifier("Punto Creado", "success");
    reset();
  }
  //---------------------------------------------- v2 points -----------------------------
  
  //---------------------------------------------- v2 Movements -----------------------------
  /* useEffect(()=>{
    async function loadMovements(){
      const res = await getAllMovements()
      console.log(res);
      // setListOptions(res.data);

    }
    loadMovements();
  }) */
  
  
  
  
  //---------------------------------------------- v2 Movements -----------------------------
  
  /* Esta accion borrala solo el punto seleccionado */
  const deleteThis = (index) =>{
    console.log("Eliminado", index);
    const puntosRestantes = [...puntos]; // Crea una copia de la matriz puntos
    puntosRestantes.splice(index, 1); // Elimina el elemento en el índice especificado
    setPuntos(puntosRestantes); // Actualiza el estado con la nueva matriz sin el elemento eliminado
  }
  
  /* Guardar todo */
  
  function saveAll(puntos){
    /* const list = new ListaPuntos(nameList,false,puntos);
    console.log("list", list); */
  }
  
  async function savePoints(){
    if(nameList !== ""){ 
      if(nameList === "grpon" || nameList === "grpoff"){
        const list = new ListaPuntos(nameList,true,puntos)
        const response = await createMovements(list);
        if(response.data){
          setListOptions(listsOptions => [...listsOptions, list]);
          notifier("Movimiento Creado Creado", "success");
          setNameList("");
          setPuntos([]);
        }
        else{   
          notifier("Error al crear movimiento", "error");
        }
      }
      else{
        const list = new ListaPuntos(nameList,false,puntos)
        const response = await createMovements(list);
        if(response.data){
          setListOptions(listsOptions => [...listsOptions, list]);
          notifier("Movimiento Creado Creado", "success");
          setNameList("");
          setPuntos([]);
        }
        else{   
          notifier("Error al crear movimiento", "error");
        }
        
      }
    


    }

    else{
      alert("Porfavor ingresa un nombre para el Movimiento"); 
    }
  }
  
  function savePointsList(){
    if(currentList !== ""){
      setMovementsList(m => [...m,currentList]);

    }
  }

  async function saveSequence(){
    if(sequenceName != ''){
      const sequence = new Sequence(sequenceName,movementsList);
      console.log(sequence)
      const response = await createsequence(sequence);
      if(response.data){
        console.log(response);
        setSequenceList([...sequenceList,response.data])
      }
    }
    else{
      window.alert("Porfavor coloque un nombre");
    }
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
  
    return(
    <>
  













    <div className="container-card fijado">
      <h2 className="titulo-card" >Coordinate Points</h2>

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
          required
          className="input-coordenada" 
          value={formulario.motor1_angle} 
          onChange={handleChange}/>
        </div>

        <div className="container-input">
          <label htmlFor="motor2_angle">motor 2 angle: </label>
          <input 
           type="number" 
            name="motor2_angle" 
            id="motor2_angle" 
            min={-125} max={125} 
            required
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
            required
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
            required
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
          required
          className="input-coordenada"
          value={formulario.motor5_angle} 
          onChange={handleChange}
          />
        </div>
        <div className="botton-form">
          <Button text="Save Point"/>    
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
            console.log(pointsOptions);

          } else {
            const p = JSON.parse(value);
            setcurrentPunto(p);
          }
        }} >
          <option value={""}>Seleccionar punto</option>
          {
          pointsOptions.map((p,i) =>
            <option className="lista-li" key={i} value={JSON.stringify(p)} >
              {`${p.name}: [${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`}
            </option>)
            }
          </select>
          <div className="opcion-seleccionada">
            selected option:  
            <b>
              {currentPunto ? currentPunto.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Add To The List" onClick={
            ()=>{
              if(currentPunto){
                setPuntos([...puntos,currentPunto])
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button text="Delete Point" onClick={ async () => {
                if(currentPunto){
                  const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar este punto?');
                  if (confirmDelete) {
                    await deletePoint(currentPunto.name);
                    notifier("Punto Borrado", "success");
                    const nuevospointsOptions = pointsOptions.filter(punto => punto.name !== currentPunto.name);
                    setpointsOptions(nuevospointsOptions);
                    //console.log(nuevospointsOptions);
                    setcurrentPunto(null);
                  }
                }
              } 
            } />
          </div>
      </div>

    </div>
















































    <div className="lista-guardada">
      <h2 className="titulo-card" >Movement</h2>
      {/* esto es lo que se va a mostrar en el fron(tarjetas de puntos) */}
      <div className="container-scroll">
        <ul className="container-li" >
            <div className="topmain">
              <div className="nombrar" >
                <label>Name movement:</label>
                <input value={nameList} type="text" autoComplete="off" placeholder="Max 10 Char" maxLength={10} className="input-coordenada escribirname" onChange={(e)=>{setNameList(e.target.value)}}/>
            </div>
              <div className="contenedor-refesh">
                <AiOutlineDelete  onClick={()=>{
                  const desicion = window.alert("desea vaciar la lista?")
                  if(!desicion){
                    setPuntos([]);
                  }
                  else{ }
                }} />
              </div>
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

          <Button text="Save Movement" onClick={savePoints} />
        </div>
      </div>
      <div className="footer-card-select">
        <select
        className="select"
        defaultValue={""}
        onChange={(e) => {
          setCurrentList(JSON.parse(e.target.value));
        }} >
          <option value={""}>Seleccionar op</option>

          {
          listsOptions.map((p,i) =>

            <option className="lista-li" key={i} value={JSON.stringify(p)} >
                {`${p.name}`}
            </option>
            )
            }

          </select>
          <div className="opcion-seleccionada">
            selected option:  
            <b>
              {currentList ? currentList.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Add To The List" onClick={
            ()=>{
              if(currentList){
                savePointsList()
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button text="Delete Movement" onClick={async () =>{
                if(currentList){
                  const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar este movimiento?');
                  if (confirmDelete) {
                    await deleteMovements(currentList.name);
                    notifier("Movement was deleted", "success");
                  }
                  const newlistsOptions = listsOptions.filter(p => p.name !==  currentList.name);
                  setListOptions(newlistsOptions);
                  setCurrentList(null);
                }
              } 
            } />
          </div>
      </div>

    </div>  




































    <div className="movimientos-guardados">
      <h2 className="titulo-card" >Sequence</h2>
      <div className="container-scroll">
      <ul className="container-li" >
        <div className="nombrar" >
          <label>Nombrar 3:</label>
          <input type="text" required autoComplete="off" placeholder="Max 10 Char" maxLength={10} className="input-coordenada escribirname" onChange={(e)=>{setSequenceName(e.target.value)}}/>
        </div>
        {movementsList.map((p,index) =>
        <li className="lista-li" key={index} >
          <div className="separacion-play">
            <AiOutlinePlayCircle className="play-punto" onClick={()=>{playThis(p)}} /> 
          </div>
          <div className="pld" >
            <div className="separacion-name">
              <b>{p.name}</b>
            </div>
          </div>
          <div className="separacion-delete">
            <AiOutlineCloseCircle className="delete-punto" onClick={()=>{deleteThis(index)}} /> 
          </div>
        </li>)}
      </ul>
        <div className="footer-card">
          <Button text="Save Sequence" onClick={()=>{
            saveSequence()
          }} />
        </div>
      </div>
      <div className="footer-card-select">
        <select
        className="select"
        defaultValue={""}
        name="puntos" 
        onChange={(e) => {
           const value = e.target.value;
          if (value === "") {
            setcurrentPunto(null); 
            console.log(pointsOptions);

          } else {
            const p = JSON.parse(value);
            setcurrentPunto(p);
          } 
        }
        } >
          <option value={""}>Seleccionar punto</option>
          
          
          {/* {
          Array.isArray(sequenceList)
          ? sequenceList.map((item, index) => (
          <option key={index} value={item}>
            hello
          </option>
          ))
          : <option>No hay elementos</option>

        } */}



        {Array.isArray(sequenceList) ? (
          sequenceList.map((item, index) => (
            <option key={index} value={item}>
              hello
            </option>
          ))
        ) : (
          <option>No hay elementos</option>
        )}









{/* 
        {sequenceList && Array.isArray(sequenceList) ? (
        sequenceList.map((item, index) => (
        <option key={index} value={JSON.stringify(item)}>
          hello
        </option>
       ))
        ) : (
      <option value="">No hay elementos disponibles</option>
      )} */}


          </select>
          <div className="opcion-seleccionada">
            selected option:  
            <b>
              {currentPunto ? currentPunto.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Add To The List" onClick={
            ()=>{
              if(currentPunto){
                setPuntos([...puntos,currentPunto])
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button text="Delete Sequence" onClick={
              () =>{
                if(currentPunto){
                  const nuevospointsOptions = pointsOptions.filter(punto => punto.name !== currentPunto.name);
                  setpointsOptions(nuevospointsOptions);
                }
              }      
            } />
          </div>
      </div>
    </div>


    </>

  );
}
export default Pcoordenadas;
