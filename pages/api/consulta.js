import { dados } from "../../componentes/dados"

export default async function consulta(req, res){
    return (new Promise((resolve, reject)=>{
        console.log("Promise...")
        dados().datas()
        .then((resultado)=>{res.send(resultado)})
        .catch((resultado)=>{res.send(resultado)})    
        resolve();    
    }))

}