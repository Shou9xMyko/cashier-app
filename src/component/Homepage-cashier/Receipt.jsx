/* eslint-disable react/prop-types */
import "./Receipt.css";
import React, { useEffect, useState } from "react";

const Receipt = React.forwardRef(({ data }, ref) => {
  const [dataReceipt, setDataReceipt] = useState({
    metode_pembayaran: data.data_cart.metode_pembayaran,
    meja_pelanggan: data.data_cart.meja_pelanggan,
    nama_pelanggan: data.data_cart.nama_pelanggan,
    nomor_pesanan: data.data_cart.nomor_pesanan,
    total_pembayaran: data.data_cart.total_pembayaran,
    daftar_produk: [],
  });

  const getCurrentDateTime = () => {
    const currentDate = new Date();

    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const date = String(currentDate.getDate()).padStart(2, "0");
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const year = currentDate.getFullYear();

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const formattedDate = `${date}/${month}/${year}`;

    const formattedDateTime = `${formattedTime} | ${formattedDate}`;

    return formattedDateTime;
  };

  useEffect(() => {
    setDataReceipt({
      metode_pembayaran: data.data_cart.metode_pembayaran,
      meja_pelanggan: data.data_cart.meja_pelanggan,
      nama_pelanggan: data.data_cart.nama_pelanggan,
      nomor_pesanan: data.data_cart.nomor_pesanan,
      total_pembayaran: data.data_cart.total_pembayaran,
      daftar_produk: data.product_cart,
    });
  }, [data]);

  return (
    <div style={{ display: "none" }}>
      <div ref={ref} className="container ">
        <div className="row justify-content-center mt-3 py-3">
          <div className="col-12 text-center mb-5">
            <p className="nama-kafe-title fs-5 mb-1">
              {localStorage.getItem("nama_cafe")}
            </p>
            <p className="alamat-kafe-title">
              {localStorage.getItem("alamat")}
            </p>
          </div>
          <div className="col">
            <p className="no-pesanan">
              No Pesanan : {dataReceipt?.nomor_pesanan}
            </p>
            <p className="tgl-pembelian">Tgl : {getCurrentDateTime()}</p>
            <p className="nama-pelanggan">
              Nama Pelanggan : {dataReceipt?.nama_pelanggan}
            </p>
            <p className="metode-pembayaran">
              Metode Pembayaran : {dataReceipt?.metode_pembayaran}
            </p>
            <p className="meja-pelanggan">
              Nomor Meja : {dataReceipt?.meja_pelanggan}
            </p>
          </div>
          <hr />
          <div className="col-12 d-flex justify-content-between">
            <p className="nama-produk-title">Nama Produk</p>
            <p className="harga-produk-title">Harga Produk</p>
            <p className="jumlah-pembelian-title">Jumlah </p>
          </div>
          <hr />
          <div className="col-12">
            <div className="row justify-content-between">
              {dataReceipt?.daftar_produk?.map((item, index) => (
                <div key={index + 1} className="d-flex justify-content-between">
                  <p className="produk">{item.name_product}</p>
                  <p className="harga-produk">
                    {item.price_product.toLocaleString("id-ID")}
                  </p>
                  <p className="jumlah-produk">{item.qty}</p>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <div className="col-12">
            <div className="row">
              {dataReceipt?.metode_pembayaran == "Tunai" ? (
                <>
                  <div className="col-3 bg-warnings">
                    <p className="total-pembayaran-text">Total Pembayaran</p>
                    <p className="uang-tunai-text">Uang Tunai</p>
                    <p className="kembali-text">Kembali</p>
                  </div>

                  <div className="col bg-dangers text-end">
                    <p className="total-pembayaran-text">
                      Rp{" "}
                      {typeof data.data_cart.total_pembayaran == "undefined"
                        ? 0
                        : data?.data_cart?.total_pembayaran?.toLocaleString(
                            "id-ID"
                          )}
                    </p>
                    <p className="uang-tunai-text">
                      Rp{" "}
                      {data.customer_cash == null
                        ? 0
                        : data?.customer_cash?.toLocaleString("id-ID")}
                    </p>
                    <p className="kembali-text">
                      Rp{" "}
                      {data.customer_cash == null && data.data_cart.length == 0
                        ? 0
                        : (
                            data?.customer_cash -
                            data?.data_cart?.total_pembayaran
                          )?.toLocaleString("id-ID")}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="text-center no-cash-payment-text">
                    BERHASIL MELAKUKAN TRANSAKSI
                  </h5>
                </>
              )}
            </div>
          </div>
          <hr />
          <div className="col">
            <p className="text-center thank-you-text">
              TERIMA KASIH TELAH MEMBELI PRODUK DI{" "}
              {localStorage.getItem("nama_cafe").toLocaleUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});

Receipt.displayName = "Receipt";

export default Receipt;
