import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./ReportSales.css";

const ReportTableDays = () => {
  const { all_report } = useSelector((state) => state.CashierReducer);

  const [totalProdukKeseluruhan, setTotalProdukKeseluruhan] = useState(0);
  const [totalProdukTerjual, setTotalProdukTerjual] = useState(0);

  useEffect(() => {
    if (all_report != null) {
      let totalPendapatanHarian = 0;
      let totalTerjualHarian = 0;

      all_report.map((item) => {
        totalPendapatanHarian += item.harga_produk * item.terjual;
        totalTerjualHarian += item.terjual;
      });
      setTotalProdukKeseluruhan(totalPendapatanHarian);
      setTotalProdukTerjual(totalTerjualHarian);
    }
  }, [all_report]);

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

  return (
    <>
      <h3 className="text-center mb-4 title-laporan-keseluruhan text-success">
        Laporan Penjualan Harian
      </h3>
      <Table bordered hover responsive className="">
        <thead>
          <tr className="text-center">
            <th scope="col" className="text-success">
              Id Produk
            </th>
            <th scope="col" className="text-success">
              Kategori Produk
            </th>
            <th scope="col" className="text-success">
              Kode Produk
            </th>
            <th scope="col" className="text-success" style={{ width: "20%" }}>
              Nama Produk
            </th>
            <th scope="col" className="text-success">
              Harga Produk
            </th>
            <th scope="col" className="text-success">
              Nomor Meja
            </th>
            <th scope="col" className="text-success" style={{ width: "15%" }}>
              Nama Pelanggan
            </th>
            <th scope="col" className="text-success" style={{ width: "30%" }}>
              Nomor Pesanan
            </th>
            <th scope="col" className="text-success">
              Terjual
            </th>
            <th scope="col" className="text-success">
              Metode Pembayaran
            </th>
            <th scope="col" className="text-success" style={{ width: "30%" }}>
              Tanggal Penjualan
            </th>
          </tr>
        </thead>
        <tbody>
          {all_report == null || all_report?.length == 0 ? (
            <tr className="text-center fs-5">
              <td
                className="py-4 text-success"
                colSpan="10"
                style={{
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  fontWeight: 700,
                }}
              >
                Tidak ada produk di laporan penjualan harian
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
        <h5 className="text-end text-success">
          Jumlah : {all_report.length} Data
        </h5>
      )}

      <div className="row mb-5 mt-4 gy-3">
        <div className="col-12">
          <h3 className="ringkasan-laporan-title text-success">
            Rinkasan Laporan Harian
          </h3>
        </div>
        <div className="col-12 d-flex gap-4 p-0 mx-2 rounded report-overall bg-success">
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

export default ReportTableDays;
