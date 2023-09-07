/* eslint-disable react-hooks/exhaustive-deps */
import "./listItem.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addToCart,
  clearCart,
  deleteProduct,
  getData,
} from "../../redux/action/action";

import UpdateProduct from "./CRUD_Product/UpdateProduct";
import Spinner from "react-bootstrap/Spinner";
import { BsTrash3Fill } from "react-icons/bs";
import Swal from "sweetalert2";

const ListItem = () => {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState([]);

  const { data } = useSelector((state) => state.CashierReducer);
  const { clear_cart } = useSelector((state) => state.CashierReducer);

  const handleAddToChart = (
    id,
    qty,
    kode_produk,
    cathegory_product,
    name_product,
    price_product
  ) => {
    dispatch(clearCart(false));
    const dataProduct = {
      id,
      qty,
      kode_produk,
      cathegory_product,
      name_product,
      price_product,
    };

    const existingProduct = product.findIndex(
      (item) => item.name_product === dataProduct.name_product
    );

    if (existingProduct != -1) {
      const addToCart = [...product];
      addToCart[existingProduct].qty += 1;
      setProduct(addToCart);
    } else {
      setProduct((prevData) => [...prevData, dataProduct]);
    }
  };

  const handleDeleteProduct = (id, nama_produk) => {
    Swal.fire({
      title: "Apakah anda yakin ?",
      text: `Produk ${nama_produk} akan terhapus`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        Swal.fire(
          "Berhasil!",
          `Produk ${nama_produk} telah terhapus!`,
          "success"
        );
      }
    });
  };

  useEffect(() => {
    dispatch(getData());
  }, []);

  useEffect(() => {
    dispatch(addToCart(product));
  }, [product]);

  useEffect(() => {
    clear_cart && setProduct([]);
  }, [clear_cart]);

  return (
    <div
      className="row border rounded py-3"
      style={{ overflowY: "scroll", height: "22em" }}
    >
      {data == null ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ color: "#ff4500" }}
        >
          <Spinner animation="grow" size="sm" />{" "}
          <Spinner animation="grow" size="sm" />{" "}
          <Spinner animation="grow" size="sm" />
        </div>
      ) : typeof data == "string" ? (
        <div className="d-flex justify-content-center align-items-center">
          <h4>
            Tidak ada product dengan nama &quot;
            <span style={{ color: "#ff4500" }}>{data}</span>&quot;
          </h4>
        </div>
      ) : data.length == 0 || typeof data == "undefined" ? (
        <div className="d-flex justify-content-center align-items-center px-5">
          <h4>
            Tidak ada produk yang tersedia, Silahkan tambah produk dengan klik
            tombol Tambah Produk di sebelah kiri
          </h4>
        </div>
      ) : (
        data.map((item) => (
          <div
            className="col-sm-12 col-lg-6 col-xl-4 d-flex flex-column align-items-center mb-3"
            key={item.id}
          >
            <div
              className="card shadow"
              style={{ width: "15rem", height: "90%" }}
              onClick={() =>
                item.stok_produk != 0 &&
                handleAddToChart(
                  item.id,
                  qty,
                  item.kode_produk,
                  item.kategori_produk,
                  item.nama_produk,
                  item.harga_produk
                )
              }
            >
              <img
                src={item.gambar_produk}
                className="card-img-top h-100"
                alt={item.kode_produk}
              />
              <div className="card-body">
                <h5 className="card-title text-wrap">
                  {item.nama_produk}{" "}
                  <span className="ms-1 fw-bold">({item.kode_produk})</span>
                </h5>
                <p className="card-text">
                  Rp {item.harga_produk.toLocaleString("id-ID")}
                </p>
                <p className="card-text">
                  Stok : {item.stok_produk == 0 ? <>Habis</> : item.stok_produk}
                </p>
              </div>
            </div>
            <div className="row mt-1">
              <div className="col-12 d-flex justify-content-center gap-5">
                <UpdateProduct dataProduct={item} />
                <button className="btn btn-action text-danger fs-5">
                  <BsTrash3Fill
                    onClick={() => {
                      handleDeleteProduct(item.id, item.nama_produk);
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListItem;
