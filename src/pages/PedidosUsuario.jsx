import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config/configApi";

const PedidosUsuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/pedidos/${id}`);
        setPedidos(data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error);
      }
    };
    fetchPedidos();
  }, [id]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pedidos del Usuario</h2>
      <ul style={styles.list}>
        {pedidos.map((pedido) => (
          <li
            key={pedido._id}
            style={styles.listItem}
            onClick={() => navigate(`/pedido-detalle/${pedido._id}`)}
          >
            {/* {pedido.image && pedido.image.length > 0 && (
              <img
                src={
                  pedido.image[0]?.url || "../assets/img/placeholderImage.png"
                }
                alt="Pedido"
                style={styles.image}
              />
            )} */}
            <div style={styles.description}>
              <p>
                <strong>Descripción:</strong> {pedido.description}
              </p>
              {/* <p>
                <strong>Cantidad:</strong> {pedido.quantity}
              </p>
              <p>
                <strong>Tiempo:</strong> {pedido.time} días
              </p> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PedidosUsuario;

const styles = {
  container: {
    width: "90%",
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    backgroundColor: "#f9f9f9",
    padding: "15px",
    marginBottom: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background 0.3s",
    display: "flex", // Agregar display flex
    alignItems: "center", // Alinea la imagen y la descripción verticalmente
    justifyContent: "space-between", // Distribuye el espacio entre la imagen y la descripción
  },
  listItemHover: {
    backgroundColor: "#e0e0e0",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    marginRight: "15px", // Se agrega margen derecho para separar la imagen de la descripción
  },
  description: {
    textAlign: "left", // Alinea el texto de las descripciones a la izquierda
  },
};
