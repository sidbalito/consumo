import { dados } from "../../../../../../.vscode/consumo/componentes/dados";

export default function handler(req, res) {
  console.log(req.method, req.query, req.body)
  switch(req.method){
    case 'GET': resultado(res, req.query); break;
    case 'POST': resultado(res, req.body); break;
    default: res.status(400).end()
  }  
}

function resultado(res, objeto){
  dados().adicionar(objeto)
  .then((resultado)=>{
    console.log("Resultado: ", resultado)
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