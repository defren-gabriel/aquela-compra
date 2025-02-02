import { useState, useRef, useEffect } from "react";

//importe o estilo local
import "./index.css";

const Lista = () => {
    //coordena a lista
    const [lista, setLista] = useState([
        {id: 1, nome: "Abacate"},
        {id: 2, nome: "Detergente"},
        {id: 3, nome: "Arroz"},
        {id: 4, nome: "Pilhas"},
        {id: 5, nome: "Ração para gatos"}
    ]);
    const handleListaRemove = (id) => setLista(lista.filter((item)=>item.id != id));
    const handleListaAdiciona = (item) => setLista((prev)=>[...prev, item]);

    //coordena a adição do item na lista
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Tentou registrar no item na lista de compras");
        let temp = {id: Math.random()*100, nome: item}
        handleListaAdiciona(temp);
        setItem("");
        handleAcaoChange();
    }

    //coordena item
    const [item, setItem] = useState("");
    const handleItemChange = (e) => setItem(e.target.value);

    //coordena a ação de mostrar o campo de registro
    const [acao, setAcao] = useState(false);
    const handleAcaoChange = () => setAcao(!acao);

    //referencia para o input texto do form
    const inputItemRef = useRef();
    useEffect(()=>{
        if(acao == true){
            inputItemRef.current.focus();
        }
    }, [acao]);

    return(
        <section>
            {
                lista.length ?
                    <h1>Lista de compras:</h1> :
                    <h1>Sua lista de compras esta vazia</h1>
            }
            <ul>
                {
                    lista.map((item)=>(
                        <li key={item.id}>-{item.nome}<button onClick={()=>handleListaRemove(item.id)}>Comprado</button></li>
                    ))
                }
            </ul>
            <button className="registrar" onClick={()=>handleAcaoChange()}>+</button>
            {
                acao &&
                <div className="novoregistro">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="item">Item</label>
                        <input type="text" name="item" id="item" value={item} onChange={handleItemChange} ref={inputItemRef} />
                        <input type="submit" value="Registrar" className="nrformsub" />
                    </form>
                </div>
            }
        </section>
    );
}

export default Lista;