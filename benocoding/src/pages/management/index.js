
import Header from "../../components/header";
import Footer from "../../components/footer";
import Main from "./components/main";
import { useState, useEffect } from "react";
import { socket } from "../../utils/socket/socket";


const Management = () => {

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
        };
      }, []);

    return <div>
        <Header />
        <Main />
        <Footer />
    </div>
}

export default Management;