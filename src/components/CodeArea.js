import React, { useEffect, useRef, useState } from "react";
import { useGlobalContext } from "../context/context";
import prismjs from "prismjs";
import axios from "../config";
import "prismjs/components/";
import "prismjs/components/prism-c.js";
import "prismjs/components/prism-python.js";
import "prismjs/components/prism-cpp.js";
import "../styles/highlight/okaidia.scss";
import "../styles/highlight/coy.scss";
import { VscRunCoverage } from "react-icons/vsc";
import { saveCodeOnStorage, countRunTimeDuration, DOM_Methods } from "../utils";
import setPrismSetting from "../config/prism-local.config";
import alternatifCode from "../utils/default-code";
import { MdOutlineCleaningServices } from "react-icons/md";

const CodeArea = () => {
  const { isRunning, lang, setRunning, savedCode } = useGlobalContext();
  const [outputResult, setOutputResult] = useState("");
  const [formatedDuration, setF] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [runtimeError, setError] = useState("");
  const inputRef = useRef(null);
  const debugRef = useRef(null);
  
  useEffect(() => {
    updateCodeHighLight();
    updateSavedCode();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [codeInput]);

  useEffect(() => {
    const text =  savedCode.trim()!="" ? savedCode : alternatifCode[lang];
    setCodeInput(text);
  }, [savedCode]);

  useEffect(() => {
    inputRef.current.innerHTML = highlightCode(codeInput);
  }, [lang]);

 
  /**
   * 
   * At time user is typing at time code is saved on localstorage
   */
  function updateSavedCode(){
    if(codeInput) saveCodeOnStorage(codeInput, lang);
  }


  /**
   * 
   * Listener for event for running code or for make tabulation
   */
  function handleKeyDown (e){
    if (e.ctrlKey && e.key == "Enter") {
      handleCodePush();
    } else if (e.key == "Tab") DOM_Methods.makeTabulation(e);
    else {
        DOM_Methods.closeAllTags(e);
    }
  };


  /**
   * Update local state of the code
   * 
   */
  function handleCodeInput(e) {
    setCodeInput(e.target.innerText);
  }


  /**
   * Launch running instance and wait for an output
   * 
   */

  async function handleCodePush() {
    if (codeInput.trim() !== "") {
      const data = {
        input: codeInput.replaceAll(String.fromCharCode(160), "#######"),
        lang,
      };
      let duration = 0;
      const intervalId = setInterval(() => {
        duration += 100;
        setF(countRunTimeDuration(duration));
      }, 100);

      try {
        setRunning(true);
        if(window.innerWidth <=800)  debugRef.current.scrollIntoView(true);
        const res = await axios.post("/api/code/input", data);
        setOutputResult(res.data.output?.replaceAll(/\n/g, "<br/>"));
        setError("");
      } catch (error) {
          setOutputResult("");
          setError(
            error?.response?.data?.output || error?.response?.data?.message 
        );
      } finally {
        setRunning(false);
        clearInterval(intervalId);
      }
    }
  }

   /**
   * For code highlightning
   * 
   */
  function updateCodeHighLight(){
    if (inputRef.current) {
        const selection = window.getSelection();
        if(selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const position = DOM_Methods.getCursorPosition(inputRef.current, range);
            inputRef.current.innerHTML = highlightCode(codeInput);
            DOM_Methods.restoreCursorPosition(inputRef.current, position);
       }else{
            inputRef.current.innerHTML = highlightCode(codeInput);
       }
    }
  }

  function highlightCode(code) {
    const setting = setPrismSetting(lang);
    return prismjs.highlight(code, setting.prismLang, setting.title);
  }

    /**
   * 
   * To escape for default style due to paste event in html element with contenteditable attribute
   */

  function pastingPrevent(e) {
    e.preventDefault();
    const text = e.clipboardData?.getData("text") ?? "";
    const newNode = highlightCode(text);
    document.execCommand("insertHTML", false, newNode);
  }

  /**
   * Clean the console output
   */
  function cleanOutput(){
    setOutputResult("");
    setError("");
  }

  return (
    <section className='code-holder'>
      <pre>
        <code
          contentEditable
          spellCheck='false'
          onPaste={pastingPrevent}
          onInput={handleCodeInput}
          ref={inputRef}
        ></code>
      </pre>

      <aside className='debug' ref={ debugRef }>
        
      <VscRunCoverage 
      onClick={ handleCodePush } 
      className="png-run-icon"
      title="Ctrl+Enter"
      />
      <MdOutlineCleaningServices 
      onClick={ cleanOutput } 
      className="clean-output"
      title="Clear console"
      />

        {isRunning ? (
          <div className='runtime-duration'> {formatedDuration}s </div>
        ) : (
          <section>
            <div>
              <h1>Output</h1>
              <p dangerouslySetInnerHTML={{ __html: outputResult }}></p>
            </div>

            <div
              className='err'
              dangerouslySetInnerHTML={{
                __html: runtimeError?.replaceAll(/\n/g, "<br/>") ?? "",
              }}
            ></div>
          </section>
        )}

        {!isRunning ? (
          <button
            className='run-btn'
            title='Ctrl + Enter'
            onClick={handleCodePush}
          >
            RUN 
          </button>
        ) : (
          <button className='running'>Processing ...</button>
        )}

        {formatedDuration && !isRunning && (
          <p className='run-duration'>Processing time {formatedDuration}s </p>
        )}
      </aside>
    </section>
  );
};

export default CodeArea;
