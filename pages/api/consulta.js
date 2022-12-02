import { dados } from "../../../../../../.vscode/consumo/componentes/dados"

export default function consulta(req, res){
    dados().datas()
    .then((resultado)=>{res.send(resultado)})
    .catch((resultado)=>{res.send(resultado)})
}