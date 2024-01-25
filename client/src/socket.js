import { io } from "socket.io-client";

const socket = io("https://heart-sync.baiquni.my.id/", {
    autoConnect: false
});

export default socket