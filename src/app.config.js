import { Base64 } from "js-base64";
const token_session = sessionStorage.getItem("token");
const token_stored = localStorage.getItem("token");

const token = token_session ? token_session : token_stored;

const user = token ? JSON.parse(Base64.decode(token)) : {};

export default user;
