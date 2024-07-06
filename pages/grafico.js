import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2"
import { useState, useEffect } from "react";

export default function Página(){
    const [dados, setDados] = useState(null)
    const [erro, setErro] = useState(null)
    const [campos, setCampos] = useState([])
    const [itens, setItens] = useState([])
    const [cores, setCores] = useState(null);

    useEffect(()=>{
        setCores(paleta())
        fetch('/api/recentes')
        .then(sucesso=>sucesso.json())
        .then(matriz=>{setDados(matriz.reverse())})
        .catch(falha=>setErro(falha))
    }, [])

    if(erro){
        return  <div>{erro.message}</div>
    }
    if(dados){
        const rótulos = []//dados.map(item=>item.data_hora.substring(11,16))
        if(campos.length == 0){
            Object.getOwnPropertyNames(dados[0]).forEach(item=>{if(item!='data_hora')campos.push(item)})
        }
        console.log(campos)
        dados.forEach(element => {
            element.dataHora = element.data_hora.substring(0,16)
        });
        let indice = 0;
        return(
            <div style={{width:800, height:600}}>
                <Line 
                    data =  {{
                        labels: rótulos,
                        datasets: itens.map(item => {return {
                            data: dados,
                            label: item,
                            borderColor: cores[++indice],
                            parsing: {
                              yAxisKey: item,
                              xAxisKey: 'dataHora',
                            },
                        }}) ,
                    }}            
                />
                {itens.toString()}
                <big style={{fontWeight: 'bold'}}>Selecione os itens que deseja exibir no gráfico:</big>
                {campos.map(item=>novoCheckbox(item))}
            </div>

        )        
    }
    return <div>Carregando...</div>

    function novoCheckbox(id){
        return(
            <div>
                <input key={id.id} id={id} type='checkbox' onChange={onchange}/>
                <label htmlFor={id}>{id}</label>                
            </div>
        )
    }

    function onchange(e){
        if(e.target.checked) itens.push(e.target.id)
        else {
            var indice = itens.indexOf(e.target.id)
            if(indice >= 0) itens.splice(indice, 1)
        }
        //setAlterado(!alterado)
        setItens(itens.slice())
        console.log(itens)
    }
}

function paleta() {
    var frequência = .3;
    var paleta = []
    for (var i = 0; i < 32; ++i) {
        let red = Math.sin(frequência * i + 0) * 127 + 128;
        let green = Math.sin(frequência * i + 2) * 127 + 128;
        let blue = Math.sin(frequência * i + 4) * 127 + 128;

        paleta.push('#'+((red<<16)+(green<<8)+(blue<<0)).toString(16).padStart(6,'0'))
    }
    return paleta.sort(()=>Math.random()-.5)
}

