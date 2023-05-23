const url_local = "http://localhost:4500";
const url_render = "https://erp-back-isdi-coders-final-project.onrender.com";

const localConnection = true;

export const url_def = localConnection ? url_local : url_render;

export const stringSeparator = "_-_";
//Used to separate string in order to distinguish fields in certain parts of code.
//To assure a coordinated work between backend and frontend, const `stringSeparator` must have the strict equal initialization in both apps (e.g. '_-_'). const `stringSeparator` are defined at /src/config.ts files of the backend and frontend. Please note that if your are going to use data in your data base with high probability of containing this string, change it to another one more complex to avoid malfunction on it.

export const roundedDecimals = 4;
