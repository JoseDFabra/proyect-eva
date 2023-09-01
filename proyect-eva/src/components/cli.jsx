import '../stylesheets/cli.css'
import {setHome} from '../api/cobot.api'
import { toast } from "react-hot-toast";


const Cli = () => {

  const comando = {
    "command":"cli",
    "type":"home",
    "name":"null"
  }
  const home = async ()=>{
    try{
      const response = await setHome(comando)
      console.log(response);
    }catch( error ){
      toast.error(`${error}`, { position: "bottom-right" });
    }
  }
  const angles = async () =>{
    
  }

  return(
    <div className="card-cli">
    <button onClick={home}>Home</button>
    <button onClick={angles} >Angles</button>
    </div>
  )
};

export default Cli