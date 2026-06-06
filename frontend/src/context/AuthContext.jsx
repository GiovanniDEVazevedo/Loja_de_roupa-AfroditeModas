/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { api } from "../services/ApiContext";

//coloca a funcao como global 
const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  //faz a requisicao do login para api 
  async function login(email, senha) {
    const resposta = await api.post("/login", {
      email,
      senha,
    })
    //Manda o token para localStorage do navegador 
    const{token , Usuario} = resposta.data
    localStorage.setItem("token", token)
    setUser({ Usuario })
    return Usuario
  }
  function logout() {
    localStorage.removeItem("token")
    setUser(null)
  }
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
export function UseAuth() {
  return useContext(AuthContext)
}