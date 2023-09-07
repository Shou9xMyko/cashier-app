import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ReportSales.css";

const ReportTableWeek = () => {
  const { all_report } = useSelector((state) => state.CashierReducer);

  const [totalProdukKeseluruhan, setTotalProdukKeseluruhan] = useState(0);
  const [totalProdukTerjual, setTotalProdukTerjual] = useState(0);

  function formatTanggalJamIndonesia(dateString) {
    const date = new Date(dateString);

    function getNamaBulan(bulan) {
      const namaBulan = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      return namaBulan[bulan];
    }

    const tanggal = date.getDate();
    const bulan = getNamaBulan(date.getMonth());
    const tahun = date.getFullYear();
    const jam = date.getHours();
    const menit =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const detik =
      date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

    return `${tanggal} ${bulan} ${tahun} ${jam}:${menit}:${detik}`;
  }

  useEffect(() => {
    if (all_report != null) {
      let totalPendapatanMingguan = 0;
      let totalTerjualMingguan = 0;
      all_report.forEach((item) => {
        totalPendapatanMingguan += item.harga_produk * item.terjual;
        totalTerjualMingguan += item.terjual;
      });
      setTotalProdukKeseluruhan(totalPendapatanMingguan);
      setTotalProdukTerjual(totalTerjualMingguan);
    }
  }, [all_report]);

  return (
    <>
      <h3
        className="text-center mb-4 title-laporan-keseluruhan"
        style={{ color: "#ff4500" }}
      >
        Laporan Penjualan Mingguan
      </h3>
      <Table bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th scope="col" style={{ color: "#ff4500" }}>
              Id Produk
            </th>
            <th scope="col" style={{ color: "#ff4500" }}>
              Kategori Produk
            </th>
            <th scope="col" style={{ color: "#ff4500" }}>
              Kode Produk
            </th>
            <th scope="col" style={{ color: "#ff4500", width: "20%" }}>
              Nama Produk
            </th>
            <th scope="col" style={{ color: "#ff4500" }}>
              Harga Produk
            </th>
            <th scope="col" style={{ color: "#ff4500" }}>
              Nomor Meja
            </th>
            <th scope="col" style={{ color: "#ff4500", width: "15%" }}>
              Nama Pelanggan
            </th>
            <th scope="col" style={{ color: "#ff4500", width: "30%" }}>
              Nomor Pesanan
            </th>
            <th scope="col" style={{ color: "#ff4500" }}>
              Terjual
            </th>
            <th scope="col" style={{ color: "#ff4500" }}>
              Metode Pembayaran
            </th>
            <th scope="col" style={{ color: "#ff4500", width: "30%" }}>
              Tanggal Penjualan
            </th>
          </tr>
        </thead>
        <tbody>
          {all_report == null || all_report?.length == 0 ? (
            <tr className="text-center fs-5">
              <td
                className="py-4"
                colSpan="10"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                  color: "#ff4500",
                }}
              >
                Tidak ada produk di laporan penjualan Mingguan
              </td>
            </tr>
          ) : (
            all_report?.map((item) => (
              <tr key={item.id} className="text-center">
                <td>{item.id_produk}</td>
                <td>{item.kategori_produk}</td>
                <td>{item.kode_produk}</td>
                <td>{item.nama_produk}</td>
                <td>{item.harga_produk}</td>
                <td>{item.no_meja_pelanggan}</td>
                <td>{item.nama_pelanggan}</td>
                <td>{item.nomor_pesanan}</td>
                <td>{item.terjual}</td>
                <td>{item.metode_pembayaran}</td>
                <td>{formatTanggalJamIndonesia(item.tanggal_penjualan)}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {all_report != null && (
        <h5 className="text-end" style={{ color: "#ff4500 " }}>
          Jumlah : {all_report.length} Data
        </h5>
      )}
      <div className="row mb-5 mt-4 gy-3">
        <div className="col-12">
          <h3 className="ringkasan-laporan-title" style={{ color: "#ff4500 " }}>
            Rinkasan Laporan Mingguan
          </h3>
        </div>
        <div
          className="col-12 d-flex gap-4 p-0 mx-2 rounded report-overall"
          style={{ backgroundColor: "#ff4500 " }}
        >
          <div className="d-flex m-4">
            <h5 className="me-1 text-white total-sales-title">
              Total Pendapatan Penjualan Produk :
            </h5>
            <h5 className="total-sales">
              Rp {totalProdukKeseluruhan.toLocaleString("id-ID")}
            </h5>
          </div>
          <div className="d-flex m-4">
            <h5 className="text-white">Jumlah Terjual Produk :</h5>
            <span className="badge badge-sales-product rounded-pill pt-2 fs-6 ms-2">
              {totalProdukTerjual}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportTableWeek;
