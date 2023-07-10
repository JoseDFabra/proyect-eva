import Buttonlink from "./components/buttonlink"
import Pcoordenadas from "./components/puntosdecoordenadas"

import './App.css';


function App() {
 
  return (
    <div className="App">
      <header className='header'>
          <ul className='navbar' >
            <div className="left-nabvar">
              <div className="container-logoHDI" >
                <a target="_blank" href="https://grupohdi.com/es/nosotros/"><img  src={require(`./images/logohdicol.png`)} className='imagen-hdi' alt="logo hdi" /></a>
              </div>
              <div className="container-title-eva" >
                <p className="title-eva" > <span className="span-eva" >Eva HDI</span>  - <b>Robot</b> </p>
              </div>
            </div>
            <div className='right-nabvar' >
              <li> <Buttonlink textbutton="Link 1" /></li>
              <li> <Buttonlink textbutton="Link 2" /></li>
              <li> <Buttonlink textbutton="Link 3" /> </li>
            </div>
          </ul>
      </header>
      <main className="main">
        <Pcoordenadas />  
      </main>
      <footer className="footer">
       
      </footer>
    </div>
  );
}

export default App;
