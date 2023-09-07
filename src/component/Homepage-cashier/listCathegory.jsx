import { useDispatch, useSelector } from "react-redux";
import "./listCathegory.css";
import { fetchData, getData } from "../../redux/action/action";
import { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

const ListCathegory = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.CashierReducer);

  const [totalProduct, setTotalProduct] = useState(null);
  const [totalMakanan, setTotalMakanan] = useState(null);
  const [totalMinuman, setTotalMinuman] = useState(null);
  const [totalCamilan, setTotalCamilan] = useState(null);

  useEffect(() => {
    const FetchAPI = async () => {
      const response = await axios.get(import.meta.env.VITE_CASHIER_API, {
        params: {
          username: localStorage.getItem("username"),
        },
      });
      const getTotalMakanan = response.data.payload.filter((item) => {
        return item.kategori_produk == "makanan";
      });

      const getTotalMinuman = response.data.payload.filter((item) => {
        return item.kategori_produk == "minuman";
      });

      const getTotalCamilan = response.data.payload.filter((item) => {
        return item.kategori_produk == "camilan";
      });

      setTotalProduct(response.data.payload.length);
      setTotalMakanan(getTotalMakanan.length);
      setTotalMinuman(getTotalMinuman.length);
      setTotalCamilan(getTotalCamilan.length);
    };
    FetchAPI();
  }, [data]);

  return (
    <Accordion className="accordion">
      <Accordion.Item eventKey="0" className="py-0 accordion-item">
        <Accordion.Header
          className="accordion-header"
          onClick={() => {
            dispatch(getData());
          }}
        >
          <p className="m-0 ms-1 accordion-title fs-5">
            Produk{" "}
            <span className="badge rounded-pill ms-3">{totalProduct}</span>
          </p>
        </Accordion.Header>
        <Accordion.Body className="px-0">
          <div className="wrapper">
            <button
              className=" list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => dispatch(fetchData("makanan"))}
              style={{ padding: "0.5em 2em" }}
            >
              Makanan
              <span className="badge rounded-pill">{totalMakanan}</span>
            </button>
          </div>
          <div className="wrapper">
            <button
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => dispatch(fetchData("minuman"))}
              style={{ padding: "0.5em  2em" }}
            >
              Minuman
              <span className="badge rounded-pill">{totalMinuman}</span>
            </button>
          </div>
          <div className="wrapper">
            <button
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
              onClick={() => dispatch(fetchData("camilan"))}
              style={{ padding: "0.5em  2em" }}
            >
              Camilan
              <span className="badge rounded-pill">{totalCamilan}</span>
            </button>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default ListCathegory;
