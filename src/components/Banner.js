import React from 'react';
import { IoMoon } from "react-icons/io5";
import { CiLight } from "react-icons/ci";
import { useGlobalContext } from '../context/context';
import jsLogo from "../assets/img/Javascript-736400_960_720.png";
import pyLogo from "../assets/img/python.png";
import cLogo from "../assets/img/C_Programming_Language.svg.png";
import cppLogo from "../assets/img/cpp.png";

const Banner = () => {

    const handleLangChange =  (e) =>{
        setLang(e.target.value);
        localStorage.setItem("curlang", e.target.value);
    } 

    const programmingLogo = {
      "js":jsLogo,
      "py":pyLogo,
      "c":cLogo,
      "cpp":cppLogo
    };
    const { isDarkMode, toggleMode ,lang, setLang } = useGlobalContext();

  
    return (
      <header>
            <h1>19Code</h1>
           <div className='sec-lang'>
              <p> <img src={ programmingLogo[lang] } /> </p>
              <select 
              name="lang" 
              id="langchoice" 
              defaultValue={lang}
              onChange={ handleLangChange }
              >
                  <option value="py">Python</option>
                  <option value="js">JavaScript</option>
                  <option value="c">C</option>
                  <option value="cpp">C++</option>
                </select>
           </div>

            <div> { isDarkMode ? <CiLight onClick={toggleMode}/> : <IoMoon onClick={toggleMode}/> } </div>
            
      </header>
    );
};

export default Banner;