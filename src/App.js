import { useState, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import Routing from "./routers/Routing";
import Login from './pages/registro/login';
import { AuthContext } from "./utils/contexts";
import { isUserLogedApi } from "./api/auth";
import { ToastContainer } from "react-toastify";

function App() {
    const [user, setUser] = useState(null);
    const [LoadUser, setLoadUser] = useState(false);
    const [initialRoute, setInitialRoute] = useState("/"); // Estado para la ruta inicial

    useEffect(() => {
        const loggedUser = isUserLogedApi();
        setUser(loggedUser);
        setInitialRoute(loggedUser ? "/tablaRegistros" : "/login"); // Establecer la ruta inicial basada en la autenticación
        setLoadUser(true);
    }, []);

    if (!LoadUser) return null;

    return (
        <AuthContext.Provider value={{ user, setInitialRoute }}>
            <Router>
                <Routing initialRoute={initialRoute} />
            </Router>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </AuthContext.Provider>
    );
}

export default App;
