import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { API_URL } from "../../config/configApi";
import { useNavigate } from "react-router-dom";

function TodosUsuariosConPedidos() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${API_URL}/usuarios-con-pedidos`);
        setUsuarios(response.data); // Guarda tanto el userId como los pedidos
      } catch (err) {
        setError("Hubo un problema al cargar los usuarios.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const handleUsuarioClick = (userId, pedidos) => {
    navigate(`/pedidos-usuario/${userId}`, { state: { pedidos } }); // Pasar los pedidos como estado
  };

  if (loading) {
    return <CircularProgress style={styles.loading} />;
  }

  if (error) {
    return <p style={styles.error}>{error}</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Usuarios con Pedidos</h1>
      {usuarios.length === 0 ? (
        <p style={styles.noUsuarios}>No hay usuarios con pedidos.</p>
      ) : (
        <div style={styles.scrollContainer}>
          {usuarios.map((usuario) => (
            <div
              key={usuario.userId}
              style={styles.card}
              onClick={() =>
                handleUsuarioClick(usuario.userId, usuario.pedidos)
              }
            >
              <p style={styles.info}>🆔 Usuario: {usuario.userId}</p>
              <p style={styles.info}>📦 Pedidos:</p>
              <ul style={styles.list}>
                {usuario.pedidos.map((pedidoId) => (
                  <li key={pedidoId} style={styles.listItem}>
                    {pedidoId}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "90%",
    maxWidth: "600px",
    textAlign: "center",
    margin: "auto",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  error: {
    fontSize: "18px",
    color: "#e74c3c",
  },
  noUsuarios: {
    fontSize: "18px",
    color: "#888",
  },
  scrollContainer: {
    maxHeight: "400px",
    overflowY: "auto",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    background: "#fff",
  },
  card: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    background: "#f9f9f9",
    cursor: "pointer",
    transition: "background 0.2s ease-in-out",
    textAlign: "left",
  },
  cardHover: {
    background: "#e0e0e0",
  },
  info: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "5px",
  },
  list: {
    paddingLeft: "20px",
  },
  listItem: {
    fontSize: "14px",
    color: "#555",
    marginBottom: "3px",
  },
  loading: {
    display: "block",
    margin: "auto",
  },
};

export default TodosUsuariosConPedidos;
