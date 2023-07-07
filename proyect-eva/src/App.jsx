import Pcoordenadas from "./components/puntosdecoordenadas"
import Buttonlink from "./components/buttonlink"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className='header'>
          <ul className='navbar' >
            <div className="left-nabvar">
              <div className="container-logoHDI" >
                <img src={require(`./images/logohdicol.png`)} className='imagen-hdi' alt="logo hdi" />
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
        <div className="left-main">
          <Pcoordenadas />
        </div>

        <div className="right-main">
          <Pcoordenadas />
        </div>
        
      </main>
      <footer className="footer"></footer>
    </div>
  );
}

export default App;
