import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Erro = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/");
    }, []);
    return(
        <>
            A pagina requisitada não existe, redirecionando
        </>
    );
}

export default Erro;