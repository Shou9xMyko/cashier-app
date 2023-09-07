/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./ReportSales.css";
import ReportTableDays from "./ReportTableDays";
import ReportTableWeek from "./ReportTableWeek";
import ReportTableMonth from "./ReportTableMonth";
import ReportTableOverall from "./ReportTableOverall";
import { useDispatch } from "react-redux";
import {
  getLaporanPenjualan,
  getLaporanPenjualanBulanan,
  getLaporanPenjualanHarian,
  getLaporanPenjualanMingguan,
} from "../../redux/action/action";
import { Link, useNavigate } from "react-router-dom";
import { BsFillHouseDoorFill } from "react-icons/bs";

const ReportSales = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [reportCathegory, setReportCathegory] = useState("");

  useEffect(() => {
    if (reportCathegory == "harian") {
      dispatch(getLaporanPenjualanHarian());
    } else if (reportCathegory == "mingguan") {
      dispatch(getLaporanPenjualanMingguan());
    } else if (reportCathegory == "bulanan") {
      dispatch(getLaporanPenjualanBulanan());
    } else if (reportCathegory == "keseluruhan") {
      dispatch(getLaporanPenjualan());
    }
  }, [reportCathegory]);

  useEffect(() => {
    localStorage.getItem("username") == null && navigate("/");
  }, []);

  return (
    <div>
      <h2 className="text-center title-laporan-penjualan mb-3 py-3 m-0">
        Laporan Penjualan {localStorage.getItem("nama_cafe")}
      </h2>
      <div className="container">
        <Link
          to="/homepage-cashier"
          className="btn btn-primary mt-3 ms-3"
          style={{ textDecoration: "none" }}
        >
          <BsFillHouseDoorFill className="mb-1 me-1" /> Kembali Ke Beranda
        </Link>
        <div className="row gx-3 gy-3 mt-4 mb-5">
          <div className="col-md-6 col-xl-3 bg-dangers">
            <button
              className="btn btn-success h-100 w-100 px-5 fs-5"
              onClick={() => setReportCathegory("harian")}
            >
              Laporan Harian
            </button>
          </div>
          <div className="col-md-6 col-xl-3 bg-primarys">
            <button
              className="btn px-5 fs-5 h-100 w-100"
              style={{ backgroundColor: "#ff4500" }}
              onClick={() => setReportCathegory("mingguan")}
            >
              Laporan Mingguan
            </button>
          </div>
          <div className="col-md-6 col-xl-3 bg-warnings">
            <button
              className="btn btn-danger px-5 h-100 w-100 fs-5"
              onClick={() => setReportCathegory("bulanan")}
            >
              Laporan Bulanan
            </button>
          </div>
          <div className="col-md-6 col-xl-3 bg-darks">
            <button
              className="btn btn-primary px-5 fs-5 h-100 w-100"
              onClick={() => setReportCathegory("keseluruhan")}
            >
              Keseluruhan
            </button>
          </div>
        </div>
        {reportCathegory == "harian" ? (
          <ReportTableDays />
        ) : reportCathegory == "mingguan" ? (
          <ReportTableWeek />
        ) : reportCathegory == "bulanan" ? (
          <ReportTableMonth />
        ) : reportCathegory == "keseluruhan" ? (
          <ReportTableOverall />
        ) : (
          <h4 className="text-center">
            Klik salah satu tombol diatas Untuk melihat laporan penjualan !
          </h4>
        )}
      </div>
    </div>
  );
};

export default ReportSales;
