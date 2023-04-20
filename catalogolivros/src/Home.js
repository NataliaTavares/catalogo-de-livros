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
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
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

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    };

    const abrirFecharModalExcluir = () => {
        setModalExcluir(!modalExcluir);
    };

    const selecionarLivro = (livro, opcao) => {
        setLivroSelecionado(livro);
        opcao === "Editar"
            ? abrirFecharModalEditar()
            : abrirFecharModalExcluir();
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

    const pedidoPut = async () => {
        const dataBrasileira = livroSelecionado.data;
        const dataAmericana = dataBrasileira.split("/").reverse().join("-");
        livroSelecionado.data = dataAmericana;
        await axios
            .put(baseUrl + "/" + livroSelecionado.id, livroSelecionado)
            .then((response) => {
                var resposta = response.data;
                var dadosAuxiliar = data;
                dadosAuxiliar.map((livro) => {
                    if (livro.id === livroSelecionado.id) {
                        livro.nome = resposta.nome;
                        livro.autores = resposta.autores;
                        livro.data = dataAmericana;
                        livro.genero = resposta.genero;
                    }
                });
                setUpdateData(true);
                abrirFecharModalEditar();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const pedidoDelete = async () => {
        await axios
            .delete(baseUrl + "/" + livroSelecionado.id)
            .then((response) => {
                setData(data.filter((livro) => livro.id !== response.data));
                setUpdateData(true);
                abrirFecharModalExcluir();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function verNomeAutor() {
        let aux = "";

        Object.keys(livroSelecionado.autores).map(function (key) {
            aux = livroSelecionado.autores[key];
        });
        let nomeAutor = aux["nome"];
        return nomeAutor;
    }

    function verNomeGenero() {
        let aux = "";

        Object.keys(livroSelecionado.genero).map(function (key) {
            aux = livroSelecionado.genero[key];
        });
        let nomeGenero = aux["nome"];
        return nomeGenero;
    }

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

    function ConvertDataAmericana(livroData) {
        const dataAmericana = livroData;
        const dataBrasileira = dataAmericana
            .split("-")
            .reverse()
            .join("/")
            .replace("T00:00:00", "");

        return dataBrasileira;
    }

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
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        selecionarLivro(livro, "Editar")
                                    }
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        selecionarLivro(livro, "Excluir")
                                    }
                                >
                                    Excluir
                                </button>
                            </td>
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

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar Livros</ModalHeader>

                <ModalBody>
                    <div className="form-group">
                        <label>ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={livroSelecionado && livroSelecionado.id}
                        />
                        <br />

                        <label>Nome:</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            onChange={handleChange}
                            value={livroSelecionado && livroSelecionado.nome}
                        />
                        <br />
                        <label>Autor: </label>
                        <br />
                        <select
                            name="autores"
                            id="autores"
                            onChange={handleChangeOption}
                        >
                            <option selected>{verNomeAutor()}</option>
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
                            value={
                                livroSelecionado &&
                                ConvertDataAmericana(livroSelecionado.data)
                            }
                        />
                        <br />
                        <label>Genero:</label>
                        <br />
                        <select
                            name="genero"
                            id="genero"
                            onChange={handleChangeOption}
                        >
                            <option selected>{verNomeGenero()}</option>
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
                        onClick={() => pedidoPut()}
                    >
                        Editar
                    </button>
                    {"   "}
                    <button
                        className="btn- btn-danger"
                        onClick={() => abrirFecharModalEditar()}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalExcluir}>
                <ModalBody>
                    Confirma a exclusão deste livro:{" "}
                    {livroSelecionado && livroSelecionado.nome} ?
                </ModalBody>

                <ModalFooter>
                    <button
                        className="btm- btn-danger"
                        onClick={() => pedidoDelete()}
                    >
                        {" "}
                        Sim{" "}
                    </button>
                    <button
                        className="btm- btn-secondary"
                        onClick={() => abrirFecharModalExcluir()}
                    >
                        {" "}
                        Não{" "}
                    </button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Home;
