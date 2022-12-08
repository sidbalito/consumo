import { dados } from "../../../componentes/dados"

export default function handler(req, res) {
    let inicio = req.query.inicio ? `${req.query.data} ${req.query.inicio}` : req.query.data
    let fim = req.query.fim ? `${req.query.data} ${req.query.fim}` :  `${req.query.data} 23:59:59` 
    //fim.setDate(fim.getDate()+1) 
    if(typeof(fim.toISOString)!='undefined'){
        fim = fim.toISOString().substring(0, 10)
    }
    dados().consulta(inicio, fim)
    .then((resultado)=>{res.status(200).json(resultado.data)})
    .catch((resultado)=>{res.status(500).json(resultado)})
    
  }