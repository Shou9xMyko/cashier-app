import AboutCashierAppImage from "../../../assets/aboutCashierApp.png";
import NavbarHomepage from "../NavbarHompage/NavbarHomepage";
import DeveloperPhoto from "../../../assets/DeveloperPhoto.jpg";
import "./About.css";

const About = () => {
  return (
    <>
      <NavbarHomepage />
      <div className="container">
        <div className="row mt-4">
          <div className="col-12 mb-0 p-0">
            <h2 className="text-center cashier-app-about-title ">
              Cashier App
            </h2>
          </div>
          <div className="col-6 p-0 mt-4" style={{ height: "fit-content" }}>
            <h5 className="cashier-app-about-text mt-4 lh-base">
              Cashier App adalah aplikasi web kasir yang dirancang khusus untuk
              membantu UMKM kafe mengelola transaksi penjualan dengan lebih
              efisien. Sebagai hasil penelitian ilmiah, aplikasi ini menyediakan
              solusi praktis dan mudah digunakan bagi pemilik bisnis. Dengan
              Cashier App, pemilik UMKM kafe dapat mencatat, mengorganisir, dan
              mengelola penjualan secara efektif. Aplikasi ini juga dilengkapi
              dengan fitur-fitur penting seperti manajemen stok, laporan
              penjualan, dan pengelolaan data pelanggan. Dengan menggunakan
              aplikasi web kasir ini, pemilik bisnis dapat mengoptimalkan
              operasional mereka, meningkatkan efisiensi, dan memberikan
              pengalaman yang lebih baik kepada pelanggan mereka.
            </h5>
          </div>
          <div className="col-6 p-0 mt-4" style={{ height: "fit-content" }}>
            <img
              src={AboutCashierAppImage}
              alt="About Cashier App Image"
              className="cashier-app-about-images m-0"
            />
          </div>
        </div>
        <div className="row my-5 gy-5">
          <div className="col-12 mb-0 p-0">
            <h2 className="text-center cashier-app-about-developer ">
              Developer
            </h2>
          </div>
          <div className="col-6">
            <h5 className="lh-base developer-about-text">
              Saya adalah mahasiswa semester 6 di Universitas Gunadarma. Saat
              ini, saya sedang mengembangkan penelitian ilmiah yang berfokus
              pada pembuatan aplikasi web kasir. Dalam penelitian ini, saya
              bertujuan untuk menggali lebih dalam pengetahuan dan keterampilan
              saya sebagai seorang{" "}
              <span className="fst-italic">Front-End Web Developer</span>. Saya
              sangat tertarik dengan bidang ini dan saya telah berusaha belajar
              secara mandiri untuk menjadi seorang{" "}
              <span className="fst-italic">Front-End Web Developer</span> yang
              handal. Saya terus mengasah kemampuan saya dengan mengikuti
              berbagai kursus dan mengikuti otodidak dalam bidang
              <span className="fst-italic"> Front-End Web Development</span>.
            </h5>
          </div>
          <div className="col-6 d-flex justify-content-center">
            <img
              src={DeveloperPhoto}
              alt="Miko Firnando"
              className="developer-photo rounded-circle shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
