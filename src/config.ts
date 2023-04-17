const url_local = "http://localhost:4500";
const url_render = "https://erp-back-isdi-coders-final-project.onrender.com";

const localConnection = false;

export const url_def = localConnection ? url_local : url_render;
