import { dados } from "../../../componentes/dados"

export default function handler(req, res) {
    let inicio = req.query.data
    let fim = new Date(inicio)
    fim.setDate(fim.getDate()+1) 
    if(typeof(fim.toISOString)!='undefined'){
        fim = fim.toISOString().substring(0, 10)
    }
    console.log(new Date(fim))
    console.log(`${inicio} ${fim}`)
    dados().consulta(inicio, fim)
    .then((resultado)=>{res.status(200).json(resultado)})
    .catch((resultado)=>{res.status(500).json(resultado)})
    
  }