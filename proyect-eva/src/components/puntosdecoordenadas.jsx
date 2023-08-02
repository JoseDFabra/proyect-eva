import React,{ useEffect, useState } from "react";
import "../stylesheets/puntosdecoordenadas.css"
import Button from "./button";
import useFormulario from "../hooks/useformulario";
import {AiOutlineCloseCircle,AiOutlineDelete, AiOutlinePlayCircle} from "react-icons/ai";
import { ListaPuntos } from "../models/ListaPuntos";
import { Sequence } from "../models/Sequence";
import { getAllPoints, createPoint, deletePoint, getAllMovements, createMovements, deleteMovements, getAllSequences, createsequence, deletesequence, /* playpoint */ } from "../api/cobot.api";
import { toast } from "react-hot-toast";


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
  const [puntosList, setPuntosList] = useState([]);
    //puntos del select
  const [movementOptions, setMovementOptions] = useState([]); // 
    //punto seleccionado del select
  const [currentMovement, setCurrentMovement] = useState(undefined); //
    // nombre de la lista de movimientos
  const [nameList, setNameList] = useState("");//
  
  
  //sequencias
    //lista de movimientos
  const [movementsList, setMovementsList] = useState([]); //
  //lista de secuencias actuales - select
  const [sequenceOptions, setSequenceOptions] = useState([]);
  //secuencia actual seleccionada.
  const [currentSequences, setCurrentSequences] = useState(undefined); //
  //nombre al momento de guardar la secuencia
  const [sequenceName, setSequenceName] = useState([]);


 //---------------------------------------------- v2 points -----------------------------
  useEffect(() => {
    async function loadPointsAndMovements() {
      try {
        const pointsres = await getAllPoints();
        setpointsOptions(pointsres.data);
  
        const movementsres = await getAllMovements();
        setMovementOptions(movementsres.data);
  
        const sequencesres = await getAllSequences();
        setSequenceOptions(sequencesres.data);
      } catch (error) {
        toast.error(`${error}`, {position: 'bottom-right'})
      }
    }
  
    loadPointsAndMovements();
  }, []);
  
  /* const submit = async e =>{
    e.preventDefault();
    //setpointsOptions([...pointsOptions,formulario,])
    await createPoint(formulario)
    toast.success('Punto Creado')
    reset();
  } */


  const submit = async (e) => {
    e.preventDefault();
    try {
      //setpointsOptions([...pointsOptions, formulario,])
      await createPoint(formulario);
      toast.success('Punto Creado', {position: 'bottom-right'});
      reset();
    } catch (error) {
      toast.error(error.message, {position: 'bottom-right'});
    }
  };
  


  
  //---------------------------------------------- v2 points -----------------------------
  
  
  /* Esta accion borrala solo el punto seleccionado en movimientos */
  const deleteThismovement = (index) =>{
    const puntosRestantes = [...puntosList]; // Crea una copia de la matriz puntos
    puntosRestantes.splice(index, 1); // Elimina el elemento en el índice especificado
    setPuntosList(puntosRestantes); // Actualiza el estado con la nueva matriz sin el elemento eliminado
  }
   /* Esta accion borrala solo el movimiento seleccionado en sequencias */
  const deleteThisSequence = (index) =>{
    const movimientosRestantes = [...movementsList];
    movimientosRestantes.splice(index, 1);
    setMovementsList(movimientosRestantes); 
  }
  
  async function savePoints() {
    if (nameList !== "") {
      const list = new ListaPuntos(nameList, true, puntosList);
  
      try {
        await createMovements(list);
        setMovementOptions((listsOptions) => [...listsOptions, list]);
        toast.success('Movimiento creado', {position: 'bottom-right'});
        setNameList("");
        setPuntosList([]);
      } catch (error) {
        toast.error(error.message, {position: 'bottom-right'});
      }
    } else {
      toast.error("Please enter a name for the Movement", {position: 'bottom-right'})
    }
  }
  
  
  function savePointsList(){
    if(currentMovement !== ""){
      setMovementsList(m => [...m,currentMovement]);

    }
  }

  async function saveSequence() {
    if (sequenceName !== '') {
      try {
        const sequence = new Sequence(sequenceName, movementsList);
        const response = await createsequence(sequence);
        if (response.data) {
          setSequenceOptions([...sequenceOptions, response.data]);
        }
      } catch (error) {
        toast.error(error.message, {
          position: 'bottom-right'
        });
      }
    } else {
      toast.error("Please give a name to the sequence", {
        position: 'bottom-right'
      });
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
                setPuntosList([...puntosList,currentPunto])
              }
              else{
                toast.error("Select a point",{position:'bottom-right'})
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button
              text="Delete Point"
              onClick={async () => {
                if (currentPunto) {
                  const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar este punto?');
                  if (confirmDelete) {
                    try {
                      await deletePoint(currentPunto.name);
                      toast.success("Punto Borrado", {
                        position: 'bottom-right'
                      });
                      const nuevospointsOptions = pointsOptions.filter(punto => punto.name !== currentPunto.name);
                      setpointsOptions(nuevospointsOptions);
                      //console.log(nuevospointsOptions);
                      setcurrentPunto(null);
                    } catch (error) {
                      toast.error(error.message, {
                        position: 'bottom-right'
                      });
                    }
                  }
                }
                else{
                  toast.error("Select a point",{position:'bottom-right'})
                }
              }}
            />

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
                <AiOutlineDelete  onClick={ ()=>{
                  const desicion = window.confirm("desea vaciar la lista?")
                  if(desicion){
                    setPuntosList([]);
                  }
                  else{ }
                }} />
              </div>
            </div>
          {puntosList.map((p,index) =>
          <li className="lista-li" key={index} >
            <div className="separacion-play">
                <AiOutlinePlayCircle
                  className="play-punto"
                  onClick={async () => {
                    playThis(p);
                    const confirmacionplaypoint1 = window.confirm("El robot se moverá");
                    if (confirmacionplaypoint1) {
                      const confirmacionplaypoint2 = window.confirm("¿Estás seguro?");
                      if (confirmacionplaypoint2) {
                        try {
                          //await playpoint(p); 
                          console.log("robot moviéndose");
                          toast.success("Robot Moviendose", {
                            position: 'bottom-right'
                          })
                        } catch (error) {
                          console.error(error.message);
                          toast.error(error.message, {position: 'bottom-right'});
                        }
                      }
                    }
                  }}
                />

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
              <AiOutlineCloseCircle className="delete-punto" onClick={()=>{deleteThismovement(index)}} /> 
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
          setCurrentMovement(JSON.parse(e.target.value));
        }} >
          <option value={""}>Reparar luego</option>
          {
            movementOptions.map((p,i) =>
              <option className="lista-li" key={i} value={JSON.stringify(p)} >
                {`${p.name}`}
              </option>
            )
          }

          </select>
          <div className="opcion-seleccionada">
            selected option:  
            <b>
              {currentMovement ? currentMovement.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Add To The List" onClick={
            ()=>{
              if(currentMovement){
                savePointsList()
              }
              else{
                toast.error("Select a movement",{position:"bottom-right"})
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button 
            text="Delete Movement" 
            onClick={async () =>{
                if(currentMovement){
                  const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar este movimiento?');
                  if (confirmDelete) {
                    try{
                      await deleteMovements(currentMovement.name);
                      toast.success("Movement was deleted", {position: 'bottom-right'})
                      const newlistsOptions = movementOptions.filter(p => p.name !==  currentMovement.name);
                      setMovementOptions(newlistsOptions);
                      setCurrentMovement(null);

                    }catch(error){
                      toast.error(error.message, {position: 'bottom-right'})
                    }
                  }
                }
                else{
                  toast.error('Select a move',{position:'bottom-right'})
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
            {/* <AiOutlinePlayCircle className="play-punto" onClick={()=>{playThis(p)}} />  */}
          </div>
          <div className="pld" >
            <div className="separacion-name">
              <b>{p.name}</b>
            </div>
          </div>
          <div className="separacion-delete">
            <AiOutlineCloseCircle className="delete-punto" onClick={()=>{deleteThisSequence(index)}} /> 
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
        name="sequence" 
        onChange={(e) => {
          const value = e.target.value;
          if (value === "") {
            setCurrentSequences(null);
          } else {
            const selectedSequence = sequenceOptions.find((item) => item.name === value);
            setCurrentSequences(selectedSequence);
          } 
        }}
      >
      <option value={""}>Select a sequence</option>
        {Array.isArray(sequenceOptions) && sequenceOptions.length > 0 
          ? (sequenceOptions.map((item, index) => (
            <option key={index} value={item.name}> {/* Asignamos el nombre de la secuencia como valor */}
                {`${item.name}: ${Object.keys(item)
                .filter(key => key.startsWith("movement"))
                .map(key => item[key])
                .map(movement => `[${movement}]`)
                .join(", ")}`}
            </option>))) 
          : (<option>No hay elementos</option>)}
    </select>

          <div className="opcion-seleccionada">
            selected option:  
            <b>
              {currentSequences ? currentSequences.name : ''}
            </b> 
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
          <Button text="Add To The List" onClick={()=>{
              if(currentSequences){
                setPuntosList([...puntosList,currentSequences])
              }
              else{
                toast.error("Select a sequence", {position:'bottom-right'})
              }
            }
          } />
          <div className="separacion-borrarpunto">
            <Button text="Delete Sequence" onClick={ async () =>{ 
               if(currentSequences){
                 const confirmDelete = window.confirm('¿Estás seguro de que deseas borrar esta secuencia?');
                 try{
                   if (confirmDelete) {
                     await deletesequence(currentSequences.name);
                     toast.success("Sequence was deleted", {position: 'bottom-right'})
                     const newsequenceoptions = sequenceOptions.filter(s => s.name !==  currentSequences.name);
                     setSequenceOptions(newsequenceoptions);
                     setCurrentSequences(null);
                   }
                 }catch(error){
                   toast.error(error.message, {position: 'bottom-center' })
                 }
               }
               else{
                toast.error('Select a sequence',{position:'bottom-right'})
               }
              }      
            } />
          </div>
      </div>
    </div>
    














































    <div className="sequencias-guardadas">

    </div>






























    </>

  );
}
export default Pcoordenadas;
