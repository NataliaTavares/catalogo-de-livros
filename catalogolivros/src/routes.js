import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Generos from "./Generos";
import Autores from "./Autores";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route element={<Generos />} path="/generos" />
                <Route element={<Autores />} path="/autores" />
            </Routes>
        </BrowserRouter>
    );
};

export default Rotas;
