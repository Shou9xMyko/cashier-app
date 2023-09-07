/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./UpdateProduct.css";
import { Button, Form, Modal } from "react-bootstrap";
import { BsPencilFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../../redux/action/action";

const UpdateProduct = ({ dataProduct }) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const [kategoriProduk, setKategoriProduk] = useState(
    dataProduct.kategori_produk
  );
  const [namaProduk, setNamaProduk] = useState(dataProduct.nama_produk);
  const [kodeProduk, setKodeProduk] = useState(dataProduct.kode_produk);
  const [gambarProduk, setGambarProduk] = useState(null);
  const [hargaProduk, setHargaProduk] = useState(dataProduct.harga_produk);
  const [stokProduk, setStokProduk] = useState(dataProduct.stok_produk);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (gambarProduk != null) {
      const data = new FormData();
      data.append("id", dataProduct.id);
      data.append("kategori_produk", kategoriProduk);
      data.append("nama_produk", namaProduk);
      data.append("kode_produk", kodeProduk);
      data.append("gambar_produk", gambarProduk);
      data.append("harga_produk", hargaProduk);
      data.append("stok_produk", stokProduk);
      data.append("username", localStorage.getItem("username"));

      dispatch(updateProduct(data));
      handleClose();
    } else {
      const data = new FormData();
      data.append("id", dataProduct.id);
      data.append("kategori_produk", kategoriProduk);
      data.append("nama_produk", namaProduk);
      data.append("kode_produk", kodeProduk);
      data.append("harga_produk", hargaProduk);
      data.append("stok_produk", stokProduk);
      data.append("username", localStorage.getItem("username"));

      dispatch(updateProduct(data));
      handleClose();
    }
  };

  useEffect(() => {
    setKategoriProduk(dataProduct.kategori_produk);
    setNamaProduk(dataProduct.nama_produk);
    setKodeProduk(dataProduct.kode_produk);
    setHargaProduk(dataProduct.harga_produk);
    setStokProduk(dataProduct.stok_produk);
  }, [dataProduct]);

  return (
    <>
      <button className="btn btn-action text-success fs-5" onClick={handleShow}>
        <BsPencilFill />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Data Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-3">
            <Form.Label className="text-dark">Kategori Produk</Form.Label>
            <Form.Select
              className="form-control-update shadow-none"
              value={kategoriProduk}
              onChange={(e) => setKategoriProduk(e.target.value)}
            >
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="camilan">Camilan</option>
            </Form.Select>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Nama-Produk">
              <Form.Label className="text-dark">Update Nama Produk</Form.Label>
              <Form.Control
                className="form-control-update shadow-none"
                type="text"
                placeholder="Update Nama Produk"
                autoFocus
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Kode-Produk">
              <Form.Label className="text-dark">Update Kode Produk</Form.Label>
              <Form.Control
                className="form-control-update shadow-none"
                type="text"
                placeholder="Update Kode Produk"
                autoFocus
                value={kodeProduk}
                onChange={(e) => setKodeProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Gambar-Barang">
              <Form.Label className="text-dark">
                Update Gambar Produk
              </Form.Label>
              <Form.Control
                className="form-control-update shadow-none"
                type="file"
                autoFocus
                accept=".png,.jpg"
                onChange={(e) => setGambarProduk(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Nama-Produk">
              <Form.Label className="text-dark">Update Harga Produk</Form.Label>
              <Form.Control
                className="form-control-update shadow-none"
                type="number"
                placeholder="Update Harga Produk"
                autoFocus
                value={hargaProduk}
                onChange={(e) => setHargaProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Nama-Produk">
              <Form.Label className="text-dark">Update Stok Produk</Form.Label>
              <Form.Control
                className="form-control-update shadow-none"
                type="number"
                placeholder="Update Stok Produk"
                autoFocus
                value={stokProduk}
                onChange={(e) => setStokProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProduct;
