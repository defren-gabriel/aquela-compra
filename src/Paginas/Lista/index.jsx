import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

//importe o estilo local
import "./index.css";

const Lista = () => {
    //coordenada o usuario e funcoes da tela
    const {user, registraItem, lista, deletaItem, loadingLista} = useAuth();
    const navigate = useNavigate();

    //coordena a adição do item na lista
    const handleSubmit = (e) => {
        e.preventDefault();
        
        registraItem(item);
        //atualiza a lista
        
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

    //verifica se estou logado, se não estiver vai para o inicio
    useEffect(()=>{
        if(!user){
            navigate("/");
        }
    }, []);

    return(
        <section>
        {
            loadingLista ? ( 
                <h1 className="titulo">Carregando sua lista...</h1> 
            ) : lista.length ? ( 
                <>
                    <h1 className="titulo">Lista de compras:</h1>
                    <ul>
                        {
                            lista.map((item) => (
                                <li key={item.id}>-{item.nome}<button onClick={() => deletaItem(item.id)}>X</button></li>
                            ))
                        }
                    </ul>
                </>
            ) : ( 
                <h1 className="titulo">Sua lista de compras está vazia</h1> 
            )
        }
        <button className="registrar" onClick={handleAcaoChange}>+</button>
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