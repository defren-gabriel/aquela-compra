import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../Contextos/AuthLoginLogout";

//Estilo local
import styles from "./Inicio.module.css";

const Inicio = () => {
    const [email, setEmail] = useState("");
    const handleEmailChange = (e) => setEmail(e.target.value);
    
    const [senha, setSenha] = useState("");
    const handleSenhaChange = (e) => setSenha(e.target.value);
        
    //coordena o registro de novo usuario
    const {user, register, login} = useAuth();
    const [error, setError] = useState("");

    //permite navegar para outra pagina
    const navigate = useNavigate();

    const tratarErroAutenticacao = (codigoErro) => {
        const erros = {
            "auth/email-already-in-use": "Este e-mail já está em uso. Tente outro ou faça login.",
            "auth/invalid-email": "O e-mail informado não é válido. Verifique e tente novamente.",
            "auth/user-not-found": "Nenhum usuário encontrado com este e-mail. Verifique ou registre-se.",
            "auth/wrong-password": "Senha incorreta. Verifique e tente novamente.",
            "auth/weak-password": "A senha deve ter pelo menos 6 caracteres.",
            "auth/network-request-failed": "Falha de conexão. Verifique sua internet.",
            "auth/too-many-requests": "Muitas tentativas seguidas. Aguarde um momento e tente novamente.",
            "auth/invalid-credential" : "Possível e-mail ou senha inválidos, verifique."
        };
    
        return erros[codigoErro] || "Ocorreu um erro inesperado. Tente novamente mais tarde.";
    }

    //faz o login ou registro
    const handleSubmit = async (e) => {
        e.preventDefault();

        //faz a verificacao dos dados e login
        if(acao){
            //fazer o login
            setError(""); 
            handleEstaLogandoChange(true);
            try {
                const loggedUser = await login(email, senha);
                
                if (loggedUser) {
                    setEmail("");
                    setSenha("");
                    navigate("/lista");
                    handleEstaLogandoChange(false);
                }
            } catch (error) {
                console.log(error.code);
                setError(tratarErroAutenticacao(error.code));
                handleEstaLogandoChange(false);
            }
        }
        else{            
            //fazer o registro
            setError(""); 
            handleEstaRegistrandoChange(true);
            try {
                const user = await register(email, senha);
                
                if (user) {
                    setEmail("");
                    setSenha("");
                    navigate("/lista");
                    handleEstaRegistrandoChange(false);
                }
            } catch (error) {
                setError(tratarErroAutenticacao(error.code));
                handleEstaRegistrandoChange(false);
            }
            
        }

    }

    //coordena a ação da tela, logar ou registrar
    const [acao, setAcao] = useState(true);
    const handleAcaoChange = () => {
        setAcao(!acao);
        inputEmailRef.current.focus();
    }

    //foca no inputemail ou verifica se esta logado
    const inputEmailRef = useRef();
    useEffect(()=>{
        if(user){
            navigate("/lista");
        }
        else{
            inputEmailRef.current.focus();
        }
    }, []);

    //controle de exibição dos botoẽs de login e registro
    const [estaLogando, setEstaLogando] = useState(false);
    const handleEstaLogandoChange = (estado) => setEstaLogando(estado);
    const [estaRegistrando, setEstaRegistrando] = useState(false);
    const handleEstaRegistrandoChange = (estado) => setEstaRegistrando(estado);

    //tentando focar no input depois de um erro
    useEffect(()=>{
        inputEmailRef.current.focus();
    }, [estaLogando, estaRegistrando]);

    return(
        <>
            {
                acao ? //true = mostra o login e false mostra o registro
                    <section className={styles.login}>
                        <h1 className={styles.ltitulo1}>Faça o Login</h1>
                        <form className={styles.form1} onSubmit={handleSubmit}>
                            <div className={styles.email}>
                                <label className={styles.label} htmlFor="email">E-mail</label>
                                <input className={styles.caixa} type="email" name="email" id="email" value={email} onChange={handleEmailChange} ref={inputEmailRef} />
                            </div>
                            <div className={styles.senha}>
                                <label className={styles.label} htmlFor="senha">Senha</label>
                                <input className={styles.caixa} type="password" name="senha" id="senha" value={senha} onChange={handleSenhaChange} />
                            </div>
                            {
                                estaLogando ? /*oculpa o botão de login/registro para evitar varios cliques do usuario*/
                                <p className={styles.lfp}>Fazendo o login</p>:
                                <div className={styles.botoes_login}>
                                    <button className={styles.blb} type="button" onClick={handleAcaoChange}>Registrar</button>
                                    <input className={styles.bli} type="submit" value="Entrar" />
                                </div>
                            }
                        </form>
                        {
                            error && <p className={styles.error}>{error}</p>
                        }
                    </section> 
                    :
                    <section className={styles.registro}>
                        <h1 className={styles.rtitulo1}>Faça o Registro</h1>
                        <form className={styles.form1} onSubmit={handleSubmit}>
                            <div className={styles.email}>
                                <label className={styles.label} htmlFor="email">E-mail</label>
                                <input className={styles.caixa} type="email" name="email" id="email" value={email} onChange={handleEmailChange} ref={inputEmailRef} />
                            </div>
                            <div className={styles.senha}>
                                <label className={styles.label} htmlFor="senha">Senha</label>
                                <input className={styles.caixa} type="password" name="senha" id="senha" value={senha} onChange={handleSenhaChange} />
                            </div>
                            {
                                estaRegistrando ?  /*oculpa o botão de login/registro para evitar varios cliques do usuario*/
                                <p className={styles.rfp}>Fazendo o registro</p>:
                                <div className={styles.botoes_registro}>
                                    <button className={styles.brb} type="button" onClick={handleAcaoChange}>Entrar</button>
                                    <input className={styles.bri} type="submit" value="Registrar" />
                                </div>
                            }
                        </form>
                        {
                            error && <p className={styles.error}>{error}</p>
                        }
                    </section>
            }
        </>
    );
}

export default Inicio;