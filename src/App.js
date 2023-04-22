import { BrowserRouter, Routes, Route } from "react-router-dom";
import Employes from "./pages/Employes/Employes";
import Generate from "./pages/Generate/Generate";
import Parametres from "./pages/Parametres/Parametres";
import New from "./pages/Employes/New/New";
import Add from "./pages/Employes/Add/Add";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Employes />} />
                <Route path="/Add" exact element={<Add />} />
                <Route path="/New/:itemID" exact element={<New />} />
                <Route path="/Generate" exact element={<Generate />} />
                <Route path="/Parametres" exact element={<Parametres />} />

                <Route path="*" exact element={<p>404 - Page introuvable</p>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
