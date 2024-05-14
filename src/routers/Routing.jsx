import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash"
import configRouting from './configRouting';

const Routing = () => (
    
        <Routes>
            {map(configRouting, (route, index) => (
                <Route key={index} path={route.path} element={
                    <route.page />} >
                </Route>
            ))}
        </Routes>
    
)

export default Routing;