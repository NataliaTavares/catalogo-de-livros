import { Link } from "react-router-dom";

import React, { useState, useEffect } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const Generos = () => {
    const baseUrl = "https://localhost:44356/api/Genero";

    const [data, setData] = useState([]);
    const [updateData, setUpdateData] = useState(true);

    const [modalIncluir, setModalIncluir] = useState(false);

    const [filter, setFilter] = useState("");

    const [generoSelecionado, setGeneroSelecionado] = useState({
        id: "",
        nome: "",
    });

    const abrirFecharModalIncluir = () => {
        setModalIncluir(!modalIncluir);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGeneroSelecionado({ ...generoSelecionado, [name]: value });
        console.log(generoSelecionado);
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
        delete generoSelecionado.id;
        await axios
            .post(baseUrl, generoSelecionado)
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
        ? data.filter((genero) =>
              genero.nome.toLowerCase().includes(filter.toLowerCase())
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
            <h1>Generos</h1>
            <Link className="menu" to="/">
                retornar a página inicial
            </Link>
            <br />
            <br />
            <button
                className="btn btn-success"
                onClick={() => abrirFecharModalIncluir()}
            >
                Incluir Novo genero
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
            <table className="table table-bordered ">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.map((genero) => (
                        <tr className="borderTable" key={genero.id}>
                            <td>{genero.id}</td>
                            <td>{genero.nome}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={modalIncluir}>
                <ModalHeader>Incluir Genero</ModalHeader>

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
        </div>
    );
};

export default Generos;
