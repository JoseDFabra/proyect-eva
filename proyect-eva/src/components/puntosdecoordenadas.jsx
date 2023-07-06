import React from "react";
import "../stylesheets/puntosdecoordenadas.css"
import Buttonsend from "./buttonsend";
function Pcoordenadas(props){
  return(
    <div className="container">
      <h3>Puntos de coordenadas</h3>
      <form className="container-form">

        <div className="container-input">
          <label htmlFor="coordenada1">coordenada 1: </label>
          <input type="number" name="coordenada1" id="coordenada1" min={-125} max={125}/>
        </div>

        <div className="container-input">
          <label htmlFor="coordenada2">coordenada 2: </label>
          <input type="number" name="coordenada2" id="coordenada2" min={-125} max={125}/>
        </div>

        <div className="container-input">
          <label htmlFor="coordenada3">coordenada 3: </label>
          <input type="number" name="coordenada3" id="coordenada3"min={-125} max={125} />
        </div>
        <div className="container-input">
          <label htmlFor="coordenada4">coordenada 4: </label>
          <input type="number" name="coordenada4" id="coordenada4"min={-125} max={125} />
        </div>
        <div className="container-input">
          <label htmlFor="coordenada5">coordenada 5: </label>
          <input type="number" name="coordenada5" id="coordenada5" min={-125} max={125}/>
        </div>
        <Buttonsend textbutton="GUARDAR PUNTO" />
      </form>
    </div>
  );
}


export default Pcoordenadas;