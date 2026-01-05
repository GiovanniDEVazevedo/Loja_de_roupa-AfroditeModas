import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); // Adicione este estado!

  useEffect(() => {
    const dadosSalvos = localStorage.getItem("usuario");
    if (dadosSalvos) {
      setUsuario(JSON.parse(dadosSalvos));
    }
    setLoading(false); // Terminou de ler do localStorage
  }, []);

  function login(dados) {
    setUsuario(dados);
    localStorage.setItem("usuario", JSON.stringify(dados));
    // Se o seu backend retorna o token dentro de dados.usuario:
    if (dados.token) localStorage.setItem("token", dados.token);
  }

  function logout() {
    setUsuario(null);
    localStorage.clear();
  }

  const isAutenticado = !!usuario;
  const isAdmin = usuario?.cargo === "admin";

  return (
    <AuthContext.Provider value={{ usuario, login, logout, isAutenticado, isAdmin, loading }}>
      {!loading && children} 
    </AuthContext.Provider>
  );
}

export function UseAuth() {
  return useContext(AuthContext);
}