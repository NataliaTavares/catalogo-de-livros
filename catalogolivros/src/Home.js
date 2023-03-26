import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
    return (
        <div className="container">
            <br />
            <h1>Cadastro de livros</h1>
            <nav>
                <ul>
                    <br />
                    <li>
                        <Link className="menu" to="/generos">
                            Generos
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;
