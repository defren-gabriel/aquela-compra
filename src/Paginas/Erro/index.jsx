import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Erro.module.css";

const Erro = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigate("/");
        }, 4000); // Espera 2 segundos antes de redirecionar
    
        return () => clearTimeout(timer); // Limpa o timer ao desmontar o componente
      }, [navigate]);

    return(
        <section className={styles.container}>
            <h1 className={styles.titulo1}>A pagina requisitada não existe, redirecionando para o início...</h1>
        </section>
    );
}

export default Erro;