import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { map } from "lodash"
import configRouting from './configRouting';

const Routing = ({ setRefreshCheckLogin }) => (
    <Router>
        <Routes>
            {map(configRouting, (route, index) => (
                <Route key={index} path={route.path} element={
                    <route.page setRefreshCheckLogin={setRefreshCheckLogin} />} >
                </Route>
            ))}
        </Routes>
    </Router>
)

export default Routing;

