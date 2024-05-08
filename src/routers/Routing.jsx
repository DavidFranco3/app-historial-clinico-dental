import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { map } from "lodash"
import configRouting from './configRouting';

const Routing = ({ initialRoute }) => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(initialRoute); // Navega a la ruta inicial cuando el componente se monta
    }, [initialRoute]);

    return (
        <Routes>
            {map(configRouting, (route, index) => (
                <Route key={index} path={route.path} element={<route.page />} />
            ))}
        </Routes>
    );
}

export default Routing;

