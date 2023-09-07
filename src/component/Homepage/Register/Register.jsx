/* eslint-disable react-hooks/exhaustive-deps */
import "./Register.css";
import SignInVector from "../../../assets/SignInVector.jpg";
import { Link, useNavigate } from "react-router-dom";
import NavbarHomepage from "../NavbarHompage/NavbarHomepage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerPost } from "../../../redux/action/action";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const { register_status } = useSelector((state) => state.CashierReducer);

  const [registerValue, setRegisterValue] = useState({
    username: "",
    email: "",
    password: "",
    alamat: "",
    nama_cafe: "",
  });

  const handleRegisterKeyDown = (event) => {
    if (event.keyCode === 32 || event.which === 32) {
      event.preventDefault();
      return;
    }
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;

    setRegisterValue((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerPost(registerValue, true));
  };

  useEffect(() => {
    register_status && navigate("/login");
  }, [register_status]);

  return (
    <>
      <NavbarHomepage />
      <div className="container ">
        <div className="row wrapperRegister mt-5">
          <div className="col-img col-6 bg-warnings pt-4 text-center">
            <img
              src={SignInVector}
              alt="Sign In Cashier"
              style={{ width: "70%", height: "90%" }}
            />
          </div>
          <div className="col-form col-6 px-4">
            <form onSubmit={handleRegisterSubmit} className="me-2">
              <h3 className="titleRegistrasi text-center mt-3 mb-3">
                Registrasi Akun
              </h3>
              <div className="row">
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input
                      name="username"
                      type="text"
                      className="form-control form-control-register-username shadow-none"
                      placeholder="Masukan username anda"
                      maxLength="35"
                      required
                      value={registerValue.username.toLowerCase()}
                      onChange={handleRegisterChange}
                      onKeyDown={handleRegisterKeyDown}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">E-mail</label>
                    <input
                      name="email"
                      type="email"
                      className="form-control form-control-register-email shadow-none"
                      placeholder="Masukan E-mail anda"
                      maxLength="30"
                      required
                      value={registerValue.email.toLowerCase()}
                      onChange={handleRegisterChange}
                      onKeyDown={handleRegisterKeyDown}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <input
                        name="password"
                        type={visiblePassword ? "text" : "password"}
                        className="form-control form-control-register-password shadow-none"
                        placeholder="Masukan password anda"
                        maxLength="15"
                        required
                        value={registerValue.password.toLowerCase()}
                        onChange={handleRegisterChange}
                        onKeyDown={handleRegisterKeyDown}
                      />
                      <span
                        className="password-toggle-icon-register input-group-text bg-white"
                        onClick={() => setVisiblePassword(!visiblePassword)}
                      >
                        {visiblePassword ? (
                          <AiOutlineEye className="fs-5" />
                        ) : (
                          <AiOutlineEyeInvisible className="fs-5" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="mb-3">
                    <label className="form-label">Nama Kafe</label>
                    <input
                      name="nama_cafe"
                      type="text"
                      className="form-control form-control-register-nama-kafe shadow-none"
                      placeholder="Masukan nama kafe anda"
                      maxLength="25"
                      required
                      value={registerValue.nama_cafe}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label className="form-label">Alamat</label>
                    <input
                      name="alamat"
                      type="text"
                      className="form-control form-control-register-alamat shadow-none"
                      placeholder="Masukan alamat anda"
                      maxLength="50"
                      required
                      value={registerValue.alamat}
                      onChange={handleRegisterChange}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-register my-3">
                    Register
                  </button>
                </div>
                <p className="text-center text-have-account">
                  Sudah mempunyai akun ?{" "}
                  <Link
                    to="/login"
                    style={{ textDecoration: "none", color: "#ff4500" }}
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
