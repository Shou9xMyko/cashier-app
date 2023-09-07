import "./AddProduct.css";
import { useState } from "react";
import { Button, Form, Modal, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { addProduct } from "../../../redux/action/action";

const AddProduct = () => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [kategori, setKategori] = useState("");
  const [namaProduk, setNamaProduk] = useState("");
  const [kodeProduk, setKodeProduk] = useState("");
  const [gambarProduk, setGambarProduk] = useState(null);
  const [hargaProduk, setHargaProduk] = useState("");
  const [stokProduk, setStokProduk] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleTambah = () => {
    if (
      kategori == "" ||
      namaProduk === "" ||
      kodeProduk === "" ||
      hargaProduk === "" ||
      stokProduk === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ada kolom inputan yang kosong, Harap periksa kembali kolom inputan anda",
      });
    }

    if (
      gambarProduk != null &&
      kategori != "" &&
      namaProduk != "" &&
      kodeProduk != "" &&
      hargaProduk != "" &&
      stokProduk != ""
    ) {
      const dataProduct = new FormData();
      dataProduct.append("kategori_produk", kategori);
      dataProduct.append("nama_produk", namaProduk);
      dataProduct.append("kode_produk", kodeProduk);
      dataProduct.append("gambar_produk", gambarProduk);
      dataProduct.append("harga_produk", hargaProduk);
      dataProduct.append("stok_produk", stokProduk);
      dataProduct.append("username", localStorage.getItem("username"));

      dispatch(addProduct(dataProduct));

      setKategori("");
      setNamaProduk("");
      setKodeProduk("");
      setGambarProduk(null);
      setHargaProduk("");
      setStokProduk("");

      handleClose();
    } else if (gambarProduk == null) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Harap masukan gambar produk!",
      });
    }
  };

  return (
    <Container className="mt-3">
      <Button className="btn-add-product" onClick={handleShow}>
        Tambah Produk
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Tambah Produk</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form className="mb-3">
            <Form.Label className="text-dark">Masukan Kategori</Form.Label>
            <Form.Select
              value={kategori}
              className="shadow-none border"
              onChange={(e) => setKategori(e.target.value)}
              aria-label="Default select example"
            >
              <option>Pilih Kategori</option>
              <option value="makanan">Makanan</option>
              <option value="minuman">Minuman</option>
              <option value="camilan">Camilan</option>
            </Form.Select>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Nama-Produk">
              <Form.Label className="text-dark">Nama Produk</Form.Label>
              <Form.Control
                className="form-control-tambah-produk shadow-none border"
                type="text"
                placeholder="Masukan Nama Produk"
                autoFocus
                value={namaProduk}
                onChange={(e) => setNamaProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Kode-Produk">
              <Form.Label className="text-dark">Kode Produk</Form.Label>
              <Form.Control
                className="form-control-tambah-produk shadow-none border"
                type="text"
                placeholder="Masukan Kode Produk"
                autoFocus
                value={kodeProduk}
                onChange={(e) => setKodeProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Gambar-Barang">
              <Form.Label className="text-dark">Masukan Gambar</Form.Label>
              <Form.Control
                className="shadow-none border"
                type="file"
                autoFocus
                accept=".png,.jpg"
                onChange={(e) => setGambarProduk(e.target.files[0])}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Nama-Produk">
              <Form.Label className="text-dark">Harga Produk</Form.Label>
              <Form.Control
                className="form-control-tambah-produk shadow-none border"
                type="number"
                placeholder="Masukan Harga Produk"
                autoFocus
                value={hargaProduk}
                onChange={(e) => setHargaProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group className="mb-3" controlId="Nama-Produk">
              <Form.Label className="text-dark">Stok Produk</Form.Label>
              <Form.Control
                className="form-control-tambah-produk shadow-none border"
                type="number"
                placeholder="Masukan Stok Produk"
                autoFocus
                value={stokProduk}
                onChange={(e) => setStokProduk(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleClose}>
            Batal
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleTambah();
            }}
          >
            Tambah
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddProduct;
