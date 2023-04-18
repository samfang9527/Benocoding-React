
import { io } from "socket.io-client";
import { PRODUCTION_BACKEND_DOMAIN } from "../../global/constant.js";

const socket = io(PRODUCTION_BACKEND_DOMAIN);

export { socket };