import { dados } from "../../componentes/dados";

export default function handler(req, res) {
  console.log(req)
  switch(req.method){
    case 'GET': resultado(res, req.query); break;
    case 'POST': resultado(res, req.body); break;
    default: res.status(400).end()
  }  
}

function resultado(res, objeto){
  dados().adicionar(objeto)
  .then((resultado)=>{
    console.log(new Date())
    let resposta = resultado.data
    if(!resposta) resposta = resultado.error 
    if(resposta)
    res.status(resultado.status).json(resposta)
    else 
    res.status(resultado.status).end()
  })
  .catch((resultado)=>{
    res.status(500).json(resultado)
  }) //*/
  
}