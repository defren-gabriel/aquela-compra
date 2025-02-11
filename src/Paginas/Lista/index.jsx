import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contextos/AuthLoginLogout";

//importe o estilo local
import styles from "./Lista.module.css";

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
        <section className={styles.secao}>
        {
            loadingLista ? ( 
                <h1 className={styles.titulo1}>Carregando sua lista...</h1> 
            ) : lista.length ? ( 
                <>
                    <h1 className={styles.titulo1}>Lista de compras:</h1>
                    <ul>
                        {
                            lista.map((item) => (
                                <li className={styles.itemlista} key={item.id}>-{item.nome}<button className={styles.lb} onClick={() => deletaItem(item.id)}>X</button></li>
                            ))
                        }
                    </ul>
                </>
            ) : ( 
                <h1 className={styles.titulo1}>Sua lista de compras está vazia</h1> 
            )
        }
        <button className={styles.registrar} onClick={handleAcaoChange}>+</button>
        {
            acao &&
            <div className={styles.novoregistro}>
                <form className={styles.novoregistrof} onSubmit={handleSubmit}>
                    <label htmlFor="item">Item</label>
                    <input className={styles.novoregistrofi} type="text" name="item" id="item" value={item} onChange={handleItemChange} ref={inputItemRef} />
                    <input type="submit" value="Registrar" className={styles.nrformsub} />
                </form>
            </div>
        }
        </section>
    );
}

export default Lista;