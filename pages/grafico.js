import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2"
import { useState, useEffect } from "react";

export default function Página(){
    const [dados, setDados] = useState(null)
    const [erro, setErro] = useState({ocorreu: false})
    const [campos, setCampos] = useState([])
    const [itens, setItens] = useState([])
    const [cores, setCores] = useState(null)
    const [data, setData] = useState(null)
    const [horários, setHorários] = useState({})
    var éDiaTodo = false

    useEffect(()=>{
        setCores(paleta())
        buscaDados()
    }, [])

    if(dados){
        const rótulos = []//dados.map(item=>item.data_hora.substring(11,16))
        if(campos.length == 0){
            Object.getOwnPropertyNames(dados[0]).forEach(item=>{if(item!='data_hora')campos.push(item)})
        }
        dados.forEach(element => {
            element.dataHora = element.data_hora.substring(0,16)
        });
        let indice = 0;
        console.log("Exceção:", (erro.ocorreu || itens.length == 0))
        return(
            <div style={{width:800}}>
                <button onClick={()=>buscaDados()}>Buscar dados recentes</button>
                <label index='status'/>
                 Buscar dados de uma data: <input type={'date'} onChange={novaData}/>
                 <label><input type='checkbox' onChange={diaTodo} />Dia todo</label>
                 De:<input type={'time'} id='inicio' onFocus={(e)=>{e.target.addEventListener('focusout',  alteraHorário)}}/>
                 Até:<input type={'time'} id='fim' onFocus={(e)=>{e.target.addEventListener('focusout',  alteraHorário)}}/>
                <Line 
                    data =  {{
                        labels: rótulos,
                        datasets: (erro.ocorreu || itens.length == 0) ? 
                        [{data: [], label: erro.mensagem || 'Nenhum item esccolhido'}] : 
                        itens.map(item => {return {
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
                <big style={{fontWeight: 'bold'}}>Selecione os itens que deseja exibir no gráfico:</big>
                {campos.map(item=>novoCheckbox(item))}
            </div>
        )        
    }
    return <div>Carregando...</div>

    function novaData(e){
        setData(e.target.value)
        if(éDiaTodo) buscaDados(`/api/consulta/${data}`)
        else mostraHorários()
    }

    function alteraHorário(e){
        const horário = e.target.value
        if(e.target.id=='inicio') horários.inicio = horário
        else if(e.target.id == 'fim') horários.fim = horário
        mostraHorários()
    }

    function mostraHorários(){
        console.log(horários)
        if(data != null && typeof(horários.inicio) != 'undefined' && typeof(horários.fim) != 'undefined')
            buscaDados(`/api/consulta/${data}?inicio=${horários.inicio}&fim=${horários.fim}`)
    }

    function diaTodo(e){
        éDiaTodo = e.target.checked
        if(éDiaTodo)
            buscaDados(`/api/consulta/${data}`)
        else
            mostraHorários()
    }

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

    function buscaDados(destino){
        let divStatus = document.getElementById('status')
        divStatus && (divStatus.innerText = "Buscando daods...")
        console.log(destino)
        let inverte
        if(!destino) inverte  = true
        console.log("Inverte:",inverte)
        fetch(destino || '/api/recentes')
        .then(sucesso=>sucesso.json())
        .then(matriz=>{console.log('Revertendo:',matriz);setDados(inverte ? matriz.reverse(): matriz); setErro({})})
        .catch(falha=>setErro({ocorreu: true, mensagem: falha.message}))
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

