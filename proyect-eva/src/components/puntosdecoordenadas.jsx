import React, { useEffect, useState } from "react";
import "../stylesheets/puntosdecoordenadas.css";
import Button from "./button";
import useFormulario from "../hooks/useformulario";
import {
  AiOutlineCloseCircle,
  AiOutlineDelete,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { ListaPuntos } from "../models/ListaPuntos";
import { Sequence } from "../models/Sequence";
import {
  getAllPoints,
  createPoint,
  deletePoint,
  getAllMovements,
  createMovements,
  deleteMovements,
  getAllSequences,
  createsequence,
  deletesequence,
  playpoint,
  playmovement,
  playsequence,
  manejoMotor,
} from "../api/cobot.api";
import { toast } from "react-hot-toast";
import YourComponent from "./form-robot";

function Pcoordenadas(prop) {
  //form control
  const [formulario, handleChange, reset] = useFormulario({
    name: "",
    motor1_angle: "",
    motor2_angle: "",
    motor3_angle: "",
    motor4_angle: "",
    motor5_angle: "",
  });

  //puntos
  //puntos de select
  const [pointsOptions, setpointsOptions] = useState([]); //lista de puntos
  //punto seleccionado del select
  const [currentPunto, setcurrentPunto] = useState(undefined); //

  //movimientos
  //lista de puntos
  const [puntosList, setPuntosList] = useState([]);
  //puntos del select
  const [movementOptions, setMovementOptions] = useState([]); //
  //punto seleccionado del select
  const [currentMovement, setCurrentMovement] = useState(undefined); //
  // nombre de la lista de movimientos
  const [nameList, setNameList] = useState(""); //

  //sequencias
  //lista de movimientos
  const [movementsList, setMovementsList] = useState([]); //
  //lista de secuencias actuales - select
  const [sequenceOptions, setSequenceOptions] = useState([]);
  //secuencia actual seleccionada.
  //const [currentSequences, setCurrentSequences] = useState(undefined); //
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
        toast.error(`${error}`, { position: "bottom-right" });
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
      setTimeout(() => {
        window.location.reload(); // Actualizar la página
      }, 2000);
      toast.success("Punto Creado", { position: "bottom-right" });
      reset();
    } catch (error) {
      toast.error(error.message, { position: "bottom-right" });
    }
  };

  //---------------------------------------------- v2 points -----------------------------

  /* Esta accion borrala solo el punto seleccionado en movimientos */
  const deleteThismovement = (index) => {
    const puntosRestantes = [...puntosList]; // Crea una copia de la matriz puntos
    puntosRestantes.splice(index, 1); // Elimina el elemento en el índice especificado
    setPuntosList(puntosRestantes); // Actualiza el estado con la nueva matriz sin el elemento eliminado
  };
  /* Esta accion borrala solo el movimiento seleccionado en sequencias */
  const deleteThisSequence = (index) => {
    const movimientosRestantes = [...movementsList];
    movimientosRestantes.splice(index, 1);
    setMovementsList(movimientosRestantes);
  };

  async function savePoints() {
    if (nameList !== "") {
      const list = new ListaPuntos(nameList, true, puntosList);

      try {
        await createMovements(list);
        setMovementOptions((listsOptions) => [...listsOptions, list]);
        toast.success("Movimiento creado", { position: "bottom-right" });
        setNameList("");
        setPuntosList([]);
      } catch (error) {
        toast.error(error.message, { position: "bottom-right" });
      }
    } else {
      toast.error("Please enter a name for the Movement", {
        position: "bottom-right",
      });
    }
  }

  function savePointsList() {
    if (currentMovement !== "") {
      setMovementsList((m) => [...m, currentMovement]);
    }
  }

  async function saveSequence() {
    if (sequenceName !== "") {
      try {
        const sequence = new Sequence(sequenceName, movementsList);
        const response = await createsequence(sequence);
        if (response.data) {
          setSequenceOptions([...sequenceOptions, response.data]);
        }
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-right",
        });
      }
    } else {
      toast.error("Please give a name to the sequence", {
        position: "bottom-right",
      });
    }
  }

  //funcion para activar y desactivar motores
  const [isActive, setIsActive] = useState(false);
  const [previousState, setPreviousState] = useState(false);

  const handleToggle = async () => {
    const newActiveState = !isActive;
    setPreviousState(isActive); // Guardar el estado anterior
    setIsActive(newActiveState); // Actualizar el estado actual
    const jsonData = {
      command: "cli",
      name: newActiveState ? "motors_on" : "motors_off",
      type: "null",
    };
    //esto es lo que se tiene que acomodar cuando se conecte a ARIA
    try {
      /* const response =  */ await manejoMotor(jsonData);
      toast.success(
        `Motores ${newActiveState ? "encendidos" : "apagados"} con éxito.`,
        { position: "bottom-right" }
      );
      if (newActiveState) {
        const inputObject = {
          j1: -31.47,
          j2: -45.03,
          j3: 64.69,
          j4: -68.5,
          j5: -28.3,
        };
        const outputObject = {};

        for (const key in inputObject) {
          if (inputObject.hasOwnProperty(key)) {
            outputObject[key] = inputObject[key];
            //console.log(`el valor de ${key}  ${inputObject[key]}`);
          }
        }
        console.log(inputObject);
        const salida1 = outputObject.j1;
        const salida2 = outputObject.j2;
        const salida3 = outputObject.j3;
        const salida4 = outputObject.j4;
        const salida5 = outputObject.j5;
      }
    } catch (error) {
      toast.error(error.message, { position: "bottom-right" });
    }
  };

  const handleCancel = () => {
    setIsActive(!previousState); // Revertir al estado anterior
    toast.error("Se canceló el manejo de motores", {
      position: "bottom-right",
    });
  };

  return (
    <>
      <div className="container-card">
        <h2 className="titulo-card">Coordinate Points</h2>

        <form className="container-form" onSubmit={submit}>
          
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
              onChange={handleChange}
            />
          </div>

          <div className="container-input">
            <label htmlFor="motor1_angle">motor 1 angle: </label>
            <input
              type="number"
              name="motor1_angle"
              id="motor1_angle"
              min={-125}
              max={125}
              required
              className="input-coordenada"
              value={formulario.motor1_angle}
              onChange={handleChange}
            />
          </div>

          <div className="container-input">
            <label htmlFor="motor2_angle">motor 2 angle: </label>
            <input
              type="number"
              name="motor2_angle"
              id="motor2_angle"
              min={-125}
              max={125}
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
              min={-125}
              max={125}
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
              min={-125}
              max={125}
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
              min={-125}
              max={125}
              required
              className="input-coordenada"
              value={formulario.motor5_angle}
              onChange={handleChange}
            />
          </div>
          <div className="botton-form">
            <div className="contenido1">
              <div className="motor-control">
                <label className="switch">
                  <input
                    type="checkbox"
                    id="toggleSwitch"
                    checked={isActive}
                    onChange={() => {
                      const actionMessage = isActive ? 'apagarán' : 'energizarán';
                      const confirmationMessage = window.confirm(`Al confirmar, los motores se ${actionMessage}. ¿Estás seguro/a?`);
                      if (confirmationMessage) {
                        handleToggle();
                      } else {
                        handleCancel();
                      }
                    }}
                  />
                  <span className="slider"></span>
                </label>
                <span className="status" id="statusText">
                  {isActive ? "Motores ON" : "Motores OFF"}
                </span>
              </div>
            </div>
            <div className="contenido2">
            <Button text="Save Point" />
            </div>
           
          </div>
        </form>
        <div className="form2">

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
              } else {
                const p = JSON.parse(value);
                setcurrentPunto(p);
              }
            }}
          >
            <option value={""}>Seleccionar punto</option>
            {pointsOptions.map((p, i) => (
              <option className="lista-li" key={i} value={JSON.stringify(p)}>
                {`${p.name}: [${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`}
              </option>
            ))}
          </select>
          <div className="opcion-seleccionada">
            selected option:
            <b>{currentPunto ? currentPunto.name : ""}</b>
          </div>
          {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}

          <div className="separacion-borrarpunto">
          <Button text={"Play punto"} onClick={async ()=>{
            if(currentPunto){
              const enviarPunto = {
                comands: "play",
                type: "point",
                name: currentPunto.name,
              };
              if(window.confirm("Advertencia: Estás a punto de mover el robot. Por favor, asegúrate de que estás seleccionando la acción correcta y que el entorno es seguro. ¿Estás seguro de que deseas proceder con el movimiento del robot?"))
              try{
                playpoint(enviarPunto);
                toast.success("Robot Moviendose", { position: "bottom-right" });
                console.log(enviarPunto);
                
              }catch(error){
                toast.error(error.message, { position: "bottom-right" });
              }
            }
            else{
              toast.error("Select a point", { position: "bottom-right" });
            }
          }} />
            <Button
              text="Delete Point"
              onClick={async () => {
                if (currentPunto) {
                  const confirmDelete = window.confirm(
                    "Atención: Si borras este punto, todos los movimientos asociados a él serán eliminados permanentemente. ¿Estás seguro de que deseas proceder?"
                  );
                  if (confirmDelete) {
                    try {
                      await deletePoint(currentPunto.name);
                      toast.success("Point was deleted", {
                        position: "bottom-right",
                      });
                      const nuevospointsOptions = pointsOptions.filter(
                        (punto) => punto.name !== currentPunto.name
                      );
                      setpointsOptions(nuevospointsOptions);
                      //console.log(nuevospointsOptions);
                      setcurrentPunto(null);
                    } catch (error) {
                      toast.error(error.message, {
                        position: "bottom-right",
                      });
                    }
                  }
                } else {
                  toast.error("Select a point", { position: "bottom-right" });
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="container-card">
        <h2 className="titulo-card">Create Movements</h2>
        {/* esto es lo que se va a mostrar en el fron(tarjetas de puntos) */}
        <div className="container-scroll">
          <ul className="container-li">
            <div className="topmain">
              <div className="nombrar">
                <label>Name movement:</label>
                <input
                  value={nameList}
                  type="text"
                  autoComplete="off"
                  placeholder="Max 10 Char"
                  maxLength={10}
                  className="input-coordenada escribirname"
                  onChange={(e) => {
                    setNameList(e.target.value);
                  }}
                />
              </div>
              <div className="contenedor-refesh">
                <AiOutlineDelete
                  onClick={() => {
                    const desicion = window.confirm("Desea vaciar esta lista?");
                    if (desicion) {
                      setPuntosList([]);
                    } else {
                    }
                  }}
                />
              </div>
            </div>
            {Array.isArray(puntosList) && puntosList.length > 0 ? (
              puntosList.map((p, index) => (
                <li className="lista-li" key={index}>
                  <div className="separacion-play">
                    <AiOutlinePlayCircle
                      className="play-punto"
                      onClick={async () => {
                        /* Esta accion dara play a solo un punto */
                        const enviarPunto = {
                          comands: "play",
                          type: "point",
                          name: p.name,
                        };

                        const confirmacionplaypoint1 = window.confirm(
                          "Advertencia: Estás a punto de mover el robot. Por favor, asegúrate de que estás seleccionando la acción correcta y que el entorno es seguro. ¿Estás seguro de que deseas proceder con el movimiento del robot?"
                        );
                        if (confirmacionplaypoint1) {
                          try {
                            await playpoint(enviarPunto);
                            console.log("ejecutando punto:  ", enviarPunto);
                            console.log("robot moviéndose");
                            toast.success("Robot Moviendose", {
                              position: "bottom-right",
                            });
                          } catch (error) {
                            toast.error(error.message, {
                              position: "bottom-right",
                            });
                          }
                        } else {
                          toast.error("The move has been canceled", {
                            position: "bottom-right",
                          });
                        }
                      }}
                    />
                  </div>
                  <div className="pld">
                    <div className="separacion-name">
                      <b>{p.name}</b>
                    </div>
                    <div className="separacion-coordenada">
                      {`[${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`}
                    </div>
                  </div>
                  <div className="separacion-delete">
                    <AiOutlineCloseCircle
                      className="delete-punto"
                      onClick={() => {
                        deleteThismovement(index);
                      }}
                    />
                  </div>
                </li>
              ))
            ) : (
              <li /* className="img-none"  */>
                Empty list.
                {/* <div className="no-data-img" >
                  <img src={require("../images/folder(1).png")} alt="lista-vacia" title="Crea una lista" width={"100px"} />
                </div> */}
              </li>
            )}
          </ul>
          <div className="footer-card">
            <Button text="Save Movement" onClick={savePoints} />
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
                } else {
                  const p = JSON.parse(value);
                  setcurrentPunto(p);
                }
              }}
            >
              <option value={""}>Seleccionar punto</option>
              {pointsOptions.map((p, i) => (
                <option className="lista-li" key={i} value={JSON.stringify(p)}>
                  {`${p.name}: 
                  [${p.motor1_angle}],
                  [${p.motor2_angle}],
                  [${p.motor3_angle}],
                  [${p.motor4_angle}],
                  [${p.motor5_angle}]`}
                </option>
              ))}
            </select>
            <div className="opcion-seleccionada">
              selected option:
              <b>{currentPunto ? currentPunto.name : ""}</b>
            </div>
            {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
            <Button
              text="Add To The List"
              onClick={() => {
                if (currentPunto) {
                  setPuntosList([...puntosList, currentPunto]);
                } else {
                  toast.error("Select a point", { position: "bottom-right" });
                }
              }}
            />
            <div className="separacion-borrarpunto">
              <Button
                text="Delete Point"
                onClick={async () => {
                  if (currentPunto) {
                    const confirmDelete = window.confirm(
                      "Atención: Si borras este punto, todos los movimientos asociados a él serán eliminados permanentemente. ¿Estás seguro de que deseas proceder?"
                    );
                    if (confirmDelete) {
                      try {
                        await deletePoint(currentPunto.name);
                        toast.success("Point was deleted", {
                          position: "bottom-right",
                        });
                        const nuevospointsOptions = pointsOptions.filter(
                          (punto) => punto.name !== currentPunto.name
                        );
                        setpointsOptions(nuevospointsOptions);
                        //console.log(nuevospointsOptions);
                        setcurrentPunto(null);
                      } catch (error) {
                        toast.error(error.message, {
                          position: "bottom-right",
                        });
                      }
                    }
                    else{
                      toast.error("Accion cancelada",{position:'bottom-right'})
                    }
                  } 
                  else {
                    toast.error("Select a point", { position: "bottom-right" });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container-card">
        <h2 className="titulo-card">Create Sequences</h2>
        <div className="container-scroll">
          <ul className="container-li">
            <div className="nombrar">
              <label>Nombrar sequence:</label>
              <input
                type="text"
                required
                autoComplete="off"
                placeholder="Max 10 Char"
                maxLength={10}
                className="input-coordenada escribirname"
                onChange={(e) => {
                  setSequenceName(e.target.value);
                }}
              />
            </div>
            {Array.isArray(movementsList) && movementsList.length > 0 ? (
              movementsList.map((p, index) => (
                <li className="lista-li" key={index}>
                  <div className="separacion-play">
                    <AiOutlinePlayCircle
                      className="play-punto"
                      onClick={async () => {
                        const afirmarmovement = window.confirm(
                          "Advertencia: Estás a punto de mover el robot. Por favor, asegúrate de que estás seleccionando la acción correcta y que el entorno es seguro. ¿Estás seguro de que deseas proceder con el movimiento del robot?"
                        );
                        if (afirmarmovement) {
                          try {
                            await playmovement(p.name);
                            console.log(p.name);
                            toast.success("Robot Moviendose", {
                              position: "bottom-right",
                            });
                          } catch (error) {
                            toast.error(error.message, {
                              position: "bottom-right",
                            });
                          }
                        }
                        else{
                          toast.error("Se cancelo el movimiento del robot", {position: "bottom-right"});

                        }
                      }}
                    />
                  </div>
                  <div className="pld">
                    <div className="separacion-name">
                      <b>{p.name}</b>
                    </div>
                  </div>

                  <div className="separacion-delete">
                    <AiOutlineCloseCircle
                      className="delete-punto"
                      onClick={() => {
                        deleteThisSequence(index);
                      }}
                    />
                  </div>
                </li>
              ))
            ) : (
              <li /*  className="img-none"  */>
                Empty list.
                {/* <div className="no-data-img" >
                  <img src={require("../images/folder(1).png")} alt="lista-vacia" title="Crea una lista" width={"100px"} />
                </div> */}
              </li>
            )}
          </ul>

          <div className="footer-card solo-sequence">
            <Button
              text="Save Sequence"
              onClick={() => {
                saveSequence();
              }}
            />
          </div>
          <div className="footer-card-select">
            <select
              className="select"
              defaultValue={""}
              onChange={(e) => {
                const value = e.target.value;
                if (value === "") {
                  setCurrentMovement(null);
                } else {
                  setCurrentMovement(JSON.parse(e.target.value));
                }
              }}
            >
              <option value={""}>Select a move</option>
              {movementOptions.map((p, i) => (
                <option className="lista-li" key={i} value={JSON.stringify(p)}>
                  {`${p.name}`}
                </option>
              ))}
            </select>
            <div className="opcion-seleccionada">
              selected option:
              <b>{currentMovement ? currentMovement.name : ""}</b>
            </div>
            {/* <Buttonsend textbutton="Guadar" onClick={()=>{console.log(i)}} /> */}
            <Button
              text="Add To The List"
              onClick={() => {
                if (currentMovement) {
                  savePointsList();
                } else {
                  toast.error("Select a move", { position: "bottom-right" });
                }
              }}
            />
            <div className="separacion-borrarpunto ">
              <Button text="Play movement" onClick={async ()=>{
            if(currentMovement){
              const enviarmovement = {
                comands: "play",
                type: "movement",
                name: currentMovement.name,
              };
              if(window.confirm("Advertencia: Estás a punto de mover el robot. Por favor, asegúrate de que estás seleccionando la acción correcta y que el entorno es seguro. ¿Estás seguro de que deseas proceder con el movimiento del robot?")){
                try{
                  playpoint(enviarmovement);
                  toast.success("Robot Moviendose", { position: "bottom-right" });
                  console.log(enviarmovement);
                  
                }catch(error){
                  toast.error(error.message, { position: "bottom-right" });
                }
              }
              else{
                toast.error("se cancelo el movimiento del robot", { position: "bottom-right" });

              }
            }
            else{
              toast.error("Select a movement", { position: "bottom-right" });
            }
              }}/>
              <Button
                text="Delete Movement"
                onClick={async () => {
                  if (currentMovement) {
                    const confirmDelete = window.confirm(
                      "Advertencia: Estás a punto de borrar un movimiento. Si este movimiento está asociado con alguna secuencia, la secuencia también se eliminará permanentemente. ¿Estás seguro de que deseas proceder?"
                    );
                    if (confirmDelete) {
                      try {
                        await deleteMovements(currentMovement.name);
                        toast.success("Movement was deleted", {
                          position: "bottom-right",
                        });
                        const newlistsOptions = movementOptions.filter(
                          (p) => p.name !== currentMovement.name
                        );
                        setMovementOptions(newlistsOptions);
                        setCurrentMovement(null);
                      } catch (error) {
                        toast.error(error.message, {
                          position: "bottom-right",
                        });
                      }
                    }
                  } else {
                    toast.error("Select a move", { position: "bottom-right" });
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      )
      <div className="container-card card-full">
        <h2 className="titulo-card">View Sequences</h2>
        <ul className="container-li conteiner-viewSequences">
          {Array.isArray(sequenceOptions) && sequenceOptions.length > 0 ? (
            sequenceOptions.map((item, index) => (
              <li className="lista-li li-grandes" key={index}>
                <div className="separacion-play">
                  <AiOutlinePlayCircle
                    className="play-punto"
                    onClick={async () => {
                      const afirmarsequence = window.confirm(
                        "Advertencia: Estás a punto de mover el robot. Por favor, asegúrate de que estás seleccionando la acción correcta y que el entorno es seguro. ¿Estás seguro de que deseas proceder con el movimiento del robot?"
                      );
                      if (afirmarsequence) {
                        try {
                          await playsequence(item.name);
                          console.log(item.name);
                          toast.success("Robot Moviendose", {
                            position: "bottom-right",
                          });
                        } catch (error) {
                          toast.error(error.message, {
                            position: "bottom-right",
                          });
                        }
                      }
                    }}
                  />
                </div>
                <div className="pld">
                  <div className="separacion-name">
                    <b>{`${item.name}`}</b>
                  </div>
                  <div className="separacion-coordenada">
                    {`[${item.movement1}],
                  [${item.movement2}],
                  [${item.movement3}],
                  [${item.movement4}],
                  [${item.movement5}]`}
                  </div>
                </div>

                <div className="separacion-delete">
                  <AiOutlineCloseCircle
                    className="delete-punto"
                    onClick={async () => {
                      const confirmdelete = window.confirm(
                        "Advertencia: Estás a punto de borrar permanentemente una secuencia. Esta acción no se puede deshacer. Por favor, asegúrate de que estás seleccionando la secuencia correcta para eliminar. ¿Estás seguro de que deseas proceder con la eliminación?"
                      );
                      if (confirmdelete === true) {
                        try {
                          await deletesequence(item.name);
                          toast.success("Sequence was deleted", {
                            position: "bottom-right",
                          });
                          const nuevosequence = sequenceOptions.filter(
                            (punto) => punto !== item
                          );
                          setSequenceOptions(nuevosequence);
                        } catch (error) {
                          toast.error(error.message, {
                            position: "bottom-right",
                          });
                        }
                      }
                    }}
                  />
                </div>
              </li>
            ))
          ) : (
            <li className="img-none">
              No sequences found.
              <div className="no-data-img">
                <img
                  src={require(`../images/no-data.png`)}
                  title="No se encontraron secuencias en la base de datos"
                  alt="no-data"
                  width={"100px"}
                />
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
export default Pcoordenadas;
