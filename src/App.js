import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employes from "./pages/Employes/Employes";
import Generate from "./pages/Generate/Generate";
import Parametres from "./pages/Parametres/Parametres";
import New from "./pages/Employes/New/New";
import Add from "./pages/Employes/Add/Add";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/Register"
                    exact
                    element={<PublicRoute Component={Register} />}
                />
                <Route
                    path="/Login"
                    exact
                    element={<PublicRoute Component={Login} />}
                />
                <Route
                    path="/"
                    exact
                    element={<PrivateRoute Component={Employes} />}
                />
                <Route
                    path="/Add"
                    exact
                    element={<PrivateRoute Component={Add} />}
                />
                <Route
                    path="/New/:itemID"
                    exact
                    element={<PrivateRoute Component={New} />}
                />
                <Route
                    path="/Generate"
                    exact
                    element={<PrivateRoute Component={Generate} />}
                />
                <Route
                    path="/Parametres"
                    exact
                    element={<PrivateRoute Component={Parametres} />}
                />

                <Route path="*" exact element={<p>404 - Page introuvable</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
