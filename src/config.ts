const url_local = "http://localhost:4500";
const url_render = "https://erp-back-isdi-coders-final-project.onrender.com";

const localConnection = true;

export const url_def = localConnection ? url_local : url_render;

export const stringSeparator = "_-_";
//Used to separate string in order to distinguish fields in certain parts of code. If your are going to use data in your data base with high probability of containing this string, change it to avoid malfunction on it. The stringSeparator need to be the same for backend and frontend to coordinate code of both apps.
