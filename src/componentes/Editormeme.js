import React, { useState, useEffect } from "react";
import '../styles/Editormeme.css';
import html2canvas from 'html2canvas';



const EditorMeme = () =>{
  const [memeName, setMemeName] = useState([]);
  const [memeImg, setMemeImg] = useState([]);
  const [ textInput, setTextInput ] = useState();
  const [ textInputDos, setTextInputDos ] = useState();



  const imgElegida = (e) =>{
    setMemeImg(memeName[e.target.value]);
  };

  const textoIngresado = (e) =>{
    setTextInput(e.target.value)
  };
  const textoIngresadoDos = (e) =>{
    setTextInputDos(e.target.value)
  };



  /* API */
  useEffect(() => {
    fetch('https://api.imgflip.com/get_memes')
        .then(data => data.json())
        .then(json => {
          setMemeName(json.data.memes);
          setMemeImg(json.data.memes[0]);
        })
}, []);

  /* DESCARGAR */
  const exportar = (e) => {
    html2canvas(document.querySelector("#exportarMeme")).then(function(canvas) {
      let img = canvas.toDataURL("meme/jpg");
      let link = document.createElement("a");
      link.download = "memeDescargado.jpg";
      link.href = img;
      link.click();
  });
}



  return(
    <div className="contenedor-texto">
      <h1 className="titulo-texto">Edita tu meme</h1>
          <h3 className="subtitulo-texto">Ingresa el texto del meme</h3>
        <div className="contenedor-input">    
          <input onChange={textoIngresado} 
                className="input-meme" 
                value={textInput}
                placeholder="Escribe tu frase" type="text" name="textomeme" arial-label="default input example" >
          </input>
          <input onChange={textoIngresadoDos} 
                className="input-meme" 
                value={textInputDos}
                placeholder="Escribe tu frase" type="text" name="textomeme" arial-label="default input example" >
          </input>
        </div>
      <select name="img" 
              className="select-img" 
              defaultValue='0' 
              onChange={imgElegida}> 
              {memeName && memeName.map((meme) =>(
                <option key={meme.id} value={meme.url}>
                {meme.name}
              </option>     
              ))} 
        </select>
        <figure className='figure-meme' id="exportarMeme">  
          <img className='img-meme' src={memeImg.url} alt="meme"/>
        </figure>
        <button onClick={exportar} className="boton-descarga">Descargar</button>
        
  </div>
  );
};

export default EditorMeme;