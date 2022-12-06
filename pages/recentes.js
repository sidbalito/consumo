import {useState, useEffect} from 'react'

export default function MyComponent() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([{"data_hora":'2022-12-03'}]);

    useEffect(()=>{
        fetch('/api/recentes')
        .then(res=>res.json())
        .then((result)=>{
            setIsLoaded(true)
            setItems(result)
        },        
        (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    if (error) {
        return <div>Erro: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Carregando...</div>;
      } else {
        return (<div>
            <p>Itens:</p>
            {items.map((item)=><p>{new Date(item.data_hora).toISOString()}</p>)}
        </div>);
      }
  }