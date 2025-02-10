import { createContext, useContext, useEffect, useState } from "react";
const globalContext = createContext();

const ContextProvider = ({ children }) => {

 const [isDarkMode,setDarkMode] = useState();
 const [isRunning,setRunning ] = useState(false);
 const [lang, setLang] = useState(localStorage.getItem("curlang") ?? "js");
 const [savedCode, setSaved] = useState("");

  useEffect(() =>{
    const mode = localStorage.getItem("codemode");
    const saved = localStorage.getItem("codesave");
    setSaved(saved ? JSON.parse(saved)[lang]?.data ?? "": "");
    if(!mode) setDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches);
    else setDarkMode(mode === "dark");
  },[lang])

  const toggleMode =  () =>{
    const mode = isDarkMode ? "light":"dark" ;
    localStorage.setItem("codemode", mode);
    setDarkMode(mode === "dark");
  }

  return (
    <globalContext.Provider
      value={{
       isDarkMode, 
       setDarkMode, 
       toggleMode,
       isRunning,
       setRunning,
       lang,
       setLang,
       savedCode
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(globalContext);
};

export { useGlobalContext, ContextProvider };