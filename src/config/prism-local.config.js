import prismjs from "prismjs";

function setPrismSetting (lang){

    const settings = {
        "js":{
            title:"javascript",
            prismLang:prismjs.languages.javascript,
        },
        "py":{
            title:"python",
            prismLang:prismjs.languages.python,
        },
        "c":{
            title:"c",
            prismLang:prismjs.languages.c,
        },
        "cpp":{
            title:"cpp",
            prismLang:prismjs.languages.cpp,
        },
    
    };

    return {
        title: settings[lang].title,
        prismLang:settings[lang].prismLang
     }
}

export default setPrismSetting;