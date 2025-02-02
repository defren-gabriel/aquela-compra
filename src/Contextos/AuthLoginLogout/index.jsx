import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../Firebase/config"; // Verifique se o caminho está correto
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword 
} from "firebase/auth";

// Criando o contexto
const AuthContext = createContext();

// Criando o provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Efeito para verificar se o usuário já está logado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Função de login
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Retorna o usuário autenticado
    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      throw error;
    }
  };
  

  // Função de registro (signup)
  const register = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user; // Retorna o usuário registrado
    } catch (error) {
      console.error("Erro ao registrar usuário:", error.message);
      throw error;
    }
  };  

  // Função de logout
  const logout = async () => {
    try {
      await signOut(auth);  // Realiza o logout
    } catch (error) {
      console.error("Erro ao fazer logout:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto mais facilmente
export const useAuth = () => useContext(AuthContext);
