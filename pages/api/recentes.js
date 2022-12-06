import { dados } from "../../componentes/dados"

export default async function consulta(req, res){
    return (new Promise((resolve, reject)=>{
        dados().recentes()
        .then((resultado)=>{res.send(resultado.data)})
        .catch((resultado)=>{res.send(resultado)})    
        resolve();    
    }))

}