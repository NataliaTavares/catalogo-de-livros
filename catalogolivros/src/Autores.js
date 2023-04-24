import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Autores = () => {
    const baseUrl = "https://localhost:44356/api/Autor";

    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(true);

    const [modalIncluir, setModalIncluir] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalExcluir, setModalExcluir] = useState(false);
    const [filter, setFilter] = useState("");

    const [autorSelecionado, setAutorSelecionado] = useState({
        id: "",
        nome: "",
    });

    const selecionarAutor = (autor, opcao) => {
        setAutorSelecionado(autor);
        opcao === "Editar"
            ? abrirFecharModalEditar()
            : abrirFecharModalExcluir();
    };

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    };

    const abrirFecharModalEditar = () => {
        setModalEditar(!modalEditar);
    };

    const abrirFecharModalExcluir = () => {
        setModalExcluir(!modalExcluir);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAutorSelecionado({ ...autorSelecionado, [name]: value });
        console.log(autorSelecionado);
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

    const pedidoPost = async () => {
        delete autorSelecionado.id;
        await axios
            .post(baseUrl, autorSelecionado)
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
        await axios
            .put(baseUrl + "/" + autorSelecionado.id, autorSelecionado)
            .then((response) => {
                var resposta = response.data;
                var dadosAuxiliar = data;
                dadosAuxiliar.map((autor) => {
                    if (autor.id === autorSelecionado.id) {
                        autor.nome = resposta.nome;
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
            .delete(baseUrl + "/" + autorSelecionado.id)
            .then((response) => {
                setData(data.filter((autor) => autor.id !== response.data));
                setUpdateData(true);
                abrirFecharModalExcluir();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredItems = filter
        ? data.filter((autor) =>
              autor.nome.toLowerCase().includes(filter.toLowerCase())
          )
        : data;

    useEffect(() => {
        if (updateData) {
            pedidoGet();
            setUpdateData(false);
        }
    }, [updateData]);

    return (
        <div className="container">
            <h1>Autores</h1>
            <Link className="menu" to="/">
                retornar a página inicial
            </Link>
            <br />
            <br />
            <button
                className="btn btn-success"
                onClick={() => abrirFecharModalIncluir()}
            >
                Incluir Novo Autor
            </button>
            <br />
            <br />
            <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Filter by name"
            />
            <br />
            <br />

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>Livros</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((autor) => (
                        <tr className="borderTable" key={autor.id}>
                            <td>{autor.id}</td>
                            <td>{autor.nome}</td>

                            <td>
                                {autor.livro.map(function (a) {
                                    const texto = a.nome;

                                    return <p>{texto}</p>;
                                })}
                            </td>
                            <td>
                                <button
                                    className="btn btn-warning"
                                    onClick={() =>
                                        selecionarAutor(autor, "Editar")
                                    }
                                >
                                    Editar
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        selecionarAutor(autor, "Excluir")
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
                <ModalHeader>Incluir Autor</ModalHeader>

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
                <ModalHeader>Editar Autor</ModalHeader>

                <ModalBody>
                    <div className="form-group">
                        <label>ID:</label>
                        <input
                            type="text"
                            className="form-control"
                            readOnly
                            value={autorSelecionado && autorSelecionado.id}
                        />
                        <br />
                        <label>Nome:</label>
                        <br />
                        <input
                            type="text"
                            className="form-control"
                            name="nome"
                            onChange={handleChange}
                            value={autorSelecionado && autorSelecionado.nome}
                        />
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
                    Confirma a exclusão deste autor:{" "}
                    {autorSelecionado && autorSelecionado.nome} ?
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

export default Autores;
