import React from "react";
import "../stylesheets/puntosdecoordenadas.css"
import Buttonsend from "./buttonsend";
function Pcoordenadas(props){
  return(
    <div className="container">
      <h2 className="titulo-puntos-de-coordenadas" >Puntos de coordenadas</h2>
      <form className="container-form">

        <div className="container-input">
          <label htmlFor="coordenada1">Coordenada 1: </label>
          <input type="number" name="coordenada1" id="coordenada1" min={-125} max={125} className="input-coordenada"/>
        </div>

        <div className="container-input">
          <label htmlFor="coordenada2">Coordenada 2: </label>
          <input type="number" name="coordenada2" id="coordenada2" min={-125} max={125} className="input-coordenada"/>
        </div>

        <div className="container-input">
          <label htmlFor="coordenada3">Coordenada 3: </label>
          <input type="number" name="coordenada3" id="coordenada3"min={-125} max={125} className="input-coordenada"/>
        </div>
        <div className="container-input">
          <label htmlFor="coordenada4">Coordenada 4: </label>
          <input type="number" name="coordenada4" id="coordenada4"min={-125} max={125} className="input-coordenada"/>
        </div>
        <div className="container-input">
          <label htmlFor="coordenada5">Coordenada 5: </label>
          <input type="number" name="coordenada5" id="coordenada5" min={-125} max={125} className="input-coordenada"/>
        </div>
        <div className="botton-form">
          <Buttonsend textbutton="Agregar punto" />
          <Buttonsend textbutton="guardar" />
        </div>
      </form>
    </div>
  );
}


export default Pcoordenadas;