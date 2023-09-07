/* eslint-disable react-hooks/exhaustive-deps */
import { PiShoppingCartBold } from "react-icons/pi";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { Button, Form, Modal } from "react-bootstrap";
import { clearCart, salesReportInsert } from "../../redux/action/action";
import { BiReceipt } from "react-icons/bi";
import Receipt from "./Receipt";
import { useReactToPrint } from "react-to-print";

const Cart = () => {
  const dispatch = useDispatch();
  const { add_cart } = useSelector((state) => state.CashierReducer);
  const [totalProduct, setTotalProduct] = useState(0);
  const { data } = useSelector((state) => state.CashierReducer);
  const receiptRef = useRef();

  const [receiptData, setReceiptData] = useState({
    data_cart: [],
    product_cart: [],
    customer_cash: null,
  });

  const [customerValue, setCustomerValue] = useState({
    payment: "",
    customer_name: "",
    table_customer: "",
  });

  const [customerCashPayment, setCustomerCashPayment] = useState(null);
  console.log("ini total produk", totalProduct);
  console.log("ini customer cash payment", customerCashPayment);

  // Modal
  const [show, setShow] = useState(false);

  const handlePrintReceipt = useReactToPrint({
    content: () => receiptRef.current,
  });

  const handleClose = () => {
    setCustomerValue({
      payment: "",
      customer_name: "",
      table_customer: "",
    });
    setShow(false);
    setCustomerCashPayment(null);
  };

  const handleBayar = () => {
    if (customerValue.payment == "" || customerValue.customer_name == "") {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Harap isi kolom inputan Data Customer",
      });
    } else if (customerValue.table_customer == "") {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Harap isi kolom inputan Meja Pelanggan",
      });
    } else if (customerCashPayment == null) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Harap isi kolom inputan Uang Pelanggan",
      });
    } else {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      const randomNum = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;

      const customer_data = {
        nomor_pesanan: `ORD - ${formattedDate} - ${randomNum}`,
        meja_pelanggan: parseInt(customerValue.table_customer),
        nama_pelanggan: customerValue.customer_name,
        metode_pembayaran: customerValue.payment,
        total_pembayaran: totalProduct,
      };

      setReceiptData((prevData) => ({
        ...prevData,
        data_cart: customer_data,
        product_cart: add_cart,
        customer_cash: parseInt(customerCashPayment),
      }));

      if (parseInt(customerCashPayment) < totalProduct) {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Uang Tunai Pelanggan Tidak Boleh Lebih Kecil Dari Harga Total Produk, Harap Periksa Kembali Inputan Uang Tunai Pelanggan!",
        });
      } else {
        dispatch(salesReportInsert(customer_data, add_cart));
        dispatch(clearCart(true));
        setShow(false);
        setTimeout(() => {
          handlePrintReceipt();
        }, 1300);
        setCustomerValue({
          payment: "",
          customer_name: "",
          table_customer: "",
        });
      }
    }
  };

  const handleLanjutkan = () => {
    const validationStockProduct = add_cart.map((itemCart) => {
      const validateSameProduct = data.find(
        (itemData) => itemData.nama_produk === itemCart.name_product
      );

      if (
        validateSameProduct &&
        itemCart.qty > validateSameProduct.stok_produk
      ) {
        return `Jumlah pemesanan produk "${itemCart.name_product}" melebihi yang stok yang tersedia, harap tambahkan produk ke daftar pesanan kembali`;
      }
      return null;
    });

    const allDataNull = validationStockProduct.every((item) => item === null);
    if (totalProduct == 0 || add_cart.length == 0) {
      Swal.fire({
        title: "Tidak ada barang di daftar pesanan",
        icon: "info",
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: "Tutup",
      });
    } else if (allDataNull && totalProduct != 0) {
      setShow(true);
    } else if (validationStockProduct) {
      const diplayMessage = async () => {
        for (let i = 0; i < validationStockProduct.length; i++) {
          if (validationStockProduct[i] != null) {
            await Swal.fire({
              icon: "error",
              title: "Error!",
              text: validationStockProduct[i],
            });
          }
        }
      };

      diplayMessage();
      dispatch(clearCart(true));
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  let total = 0;

  useEffect(() => {
    add_cart.forEach((item) => {
      total += item.price_product * item.qty;
    });
    setTotalProduct(total);
  }, [add_cart]);

  return (
    <div>
      <div className="row m-0">
        <div
          className="col-12 bg-dangers border rounded pt-2 "
          style={{ height: "24em" }}
        >
          {add_cart?.map((item, index) => (
            <div
              className="daftarPesanan"
              style={{ marginBottom: "0.5em" }}
              key={index}
            >
              <div className="row">
                <div className="col-2 bg-dangers ps-3">
                  <span
                    className="badge m-0"
                    style={{ backgroundColor: "#25E61E" }}
                  >
                    {item.qty}
                  </span>
                </div>
                <div className="col-5 bg-warnings pt-1">
                  <p className="nameProduct m-0">{item.name_product}</p>
                </div>
                <div className="col-5 bg-primarys pt-1">
                  <p className="price m-0">
                    Rp {item.price_product.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12">
          <div className="text-end">
            <button
              className="btn clear-btn border-0 p-0 my-2 text-dark"
              onClick={() => dispatch(clearCart(true))}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="col-12 pt-4">
          <div>
            <div className="d-flex justify-content-between">
              <p className="totalHarga">Total Harga :</p>
              <p className="totalHarga">
                Rp{" "}
                {isNaN(totalProduct) ? 0 : totalProduct.toLocaleString("id-ID")}
              </p>
            </div>
            <button
              className="btn-bayar btn text-white w-100"
              onClick={handleLanjutkan}
            >
              <PiShoppingCartBold /> Lanjutkan
            </button>
          </div>
        </div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Data Pelanggan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="mb-3">
              <Form.Label>Metode Pembayaran</Form.Label>
              <Form.Select
                name="payment"
                value={customerValue.payment}
                onChange={handleInputChange}
              >
                <option>Pilih Metode Pembayaran</option>
                <option value="Tunai">Tunai</option>
              </Form.Select>
            </Form>
            {customerValue.payment == "Tunai" && (
              <>
                <Form>
                  <Form.Group className="mb-3" controlId="Nama-Produk">
                    <Form.Label>Nama Pelanggan (Atas nama pesanan)</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nama Pelanggan"
                      name="customer_name"
                      value={customerValue.customer_name}
                      onChange={handleInputChange}
                    />
                  </Form.Group>
                </Form>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Meja Pelanggan</Form.Label>
                    <Form.Control
                      className="TableCustomer"
                      name="table_customer"
                      value={customerValue.table_customer}
                      onChange={handleInputChange}
                      type="number"
                      placeholder="Masukan Nomor Meja Pelanggan"
                    />
                  </Form.Group>
                </Form>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Uang Pelanggan</Form.Label>
                    <Form.Control
                      className="customerCashInput"
                      type="number"
                      placeholder="Masukan Uang Tunai Pelanggan"
                      onChange={(e) => setCustomerCashPayment(e.target.value)}
                    />
                  </Form.Group>
                </Form>

                <Form>
                  <Form.Group className="d-flex justify-content-between">
                    <div className="wrapperBill1">
                      <p>
                        Total
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
                      </p>
                      <p>Bayar &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</p>
                      <p>Kembali :</p>
                    </div>
                    <div className="wrapperBill2">
                      <p>
                        Rp{" "}
                        {isNaN(totalProduct)
                          ? 0
                          : totalProduct.toLocaleString("id-ID")}
                      </p>
                      <p>
                        Rp{" "}
                        {customerCashPayment == null
                          ? 0
                          : customerCashPayment >= totalProduct
                          ? new Intl.NumberFormat("id-ID", {
                              currency: "IDR",
                            }).format(customerCashPayment)
                          : 0}
                      </p>

                      <p>
                        Rp{" "}
                        {customerCashPayment >= totalProduct
                          ? (customerCashPayment - totalProduct).toLocaleString(
                              "id-ID"
                            )
                          : 0}
                      </p>
                    </div>
                  </Form.Group>
                </Form>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleBayar}>
              <BiReceipt className="mb-1 fs-5" />
              Bayar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <Receipt ref={receiptRef} data={receiptData} />
    </div>
  );
};

export default Cart;
