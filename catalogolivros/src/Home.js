import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Home = () => {
    var moment = require("moment");

    const baseUrl = "https://localhost:44356/api/Livro";
    const baseUrlAutores = "https://localhost:44356/api/Autor";
    const baseUrlGeneros = "https://localhost:44356/api/Genero";

    const [data, setData] = useState([]);
    const [autoresData, setAutoresData] = useState([]);
    const [generosData, setGenerosData] = useState([]);
    const [updateData, setUpdateData] = useState(true);

    const [modalIncluir, setModalIncluir] = useState(false);
    const [filter, setFilter] = useState("");

    const [livroSelecionado, setLivroSelecionado] = useState({
        id: "",
        nome: "",
        autores: { id: "" },
        data: "",
        genero: { id: "" },
    });

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLivroSelecionado({ ...livroSelecionado, [name]: value });
        console.log(livroSelecionado);
    };

    const handleChangeOption = (e) => {
        const { name, value } = e.target;
        setLivroSelecionado({
            ...livroSelecionado,
            [name]: [{ ["id"]: value }],
        });
        console.log(livroSelecionado);
    };

    const pedidoGet = async () => {
        await axios
            .get(baseUrl)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const autoresGet = async () => {
        await axios
            .get(baseUrlAutores)
            .then((response) => {
                setAutoresData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const generosGet = async () => {
        await axios
            .get(baseUrlGeneros)
            .then((response) => {
                setGenerosData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoPost = async () => {
        delete livroSelecionado.id;

        const dataBrasileira = livroSelecionado.data;
        const dataAmericana = dataBrasileira.split("/").reverse().join("-");

        livroSelecionado.data = dataAmericana;
        await axios
            .post(baseUrl, livroSelecionado)
            .then((response) => {
                setData(data.concat(response.data));
                setUpdateData(true);
                abrirFecharModalIncluir();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredItems = filter
        ? data.filter((livro) =>
              livro.nome.toLowerCase().includes(filter.toLowerCase())
          )
        : data;

    useEffect(() => {
        if (updateData) {
            pedidoGet();
            autoresGet();
            generosGet();
            setUpdateData(false);
        }
    }, [updateData]);

    return (
        <div className="container">
            <br />
            <h1>Cadastro de livros</h1>
            <header>
                <button
                    className="btn btn-success"
                    onClick={() => abrirFecharModalIncluir()}
                >
                    Incluir Novo Livro
                </button>
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Filter by name"
                />
                <br />
                <br />
            </header>

            <nav>
                <ul>
                    <li>
                        <Link className="menu" to="/autores">
                            Autores
                        </Link>
                    </li>
                    <br />
                    <li>
                        <Link className="menu" to="/generos">
                            Generos
                        </Link>
                    </li>
                </ul>
            </nav>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Autor</th>
                        <th>Data da Publicação</th>
                        <th>Genero</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((livro) => (
                        <tr key={livro.id}>
                            <td>{livro.id}</td>
                            <td>{livro.nome}</td>
                            <td>{livro.autores.map((t) => t.nome).join()}</td>

                            <td>{moment(livro.data).format("DD/MM/YYYY")}</td>
                            <td>{livro.genero.map((t) => t.nome).join()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalIncluir}>
                <ModalHeader>Incluir Livros</ModalHeader>

                <ModalBody>
                    <div className="form-group">
                        <label>Nome:</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            onChange={handleChange}
                        />
                        <br />
                        <label>Autor: </label>
                        <br />

                        <select
                            name="autores"
                            id="autores"
                            onChange={handleChangeOption}
                        >
                            <option></option>
                            {autoresData.map((t) => (
                                <option value={t.id}>{t.nome}</option>
                            ))}
                        </select>
                        <br />

                        <label>Data Publicação: </label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="data"
                            onChange={handleChange}
                        />
                        <br />
                        <label>Genero:</label>
                        <br />
                        <select
                            name="genero"
                            id="genero"
                            onChange={handleChangeOption}
                        >
                            <option></option>
                            {generosData.map((t) => (
                                <option value={t.id}>{t.nome}</option>
                            ))}
                        </select>
                        <br />
                    </div>
                </ModalBody>

                <ModalFooter>
                    <button
                        className="btn-btb-primary"
                        onClick={() => pedidoPost()}
                    >
                        Incluir
                    </button>
                    {"   "}
                    <button
                        className="btn- btn-danger"
                        onClick={() => abrirFecharModalIncluir()}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Home;
