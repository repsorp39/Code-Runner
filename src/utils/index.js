import DOM_Methods from "./dom-management";

function countRunTimeDuration(time) {
  const ms = (time % 1000) / 1000;
  let minute = Math.floor(Math.floor(time / 1000)) % 60;

  minute = minute.toString().padStart(2, "0");

  if (minute === "00") {
    return `${ms} `;
  } else {
    return `${minute} : ${ms}`;
  }
}


function saveCodeOnStorage(code, lang) {
  let codeStore = localStorage.getItem("codesave") ?? "{}";
  codeStore = JSON.parse(codeStore);
  codeStore[lang] = { data: code };
  localStorage.setItem("codesave", JSON.stringify(codeStore));
}

export {
  countRunTimeDuration,
  saveCodeOnStorage,
  DOM_Methods
};

