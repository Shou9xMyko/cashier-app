/* eslint-disable react-hooks/exhaustive-deps */
import "./Login.css";
import LoginVector from "../../../assets/LoginVector.png";
import { Link, useNavigate } from "react-router-dom";
import NavbarHomepage from "../NavbarHompage/NavbarHomepage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginPost, registerPost } from "../../../redux/action/action";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [visiblePassword, setVisiblePassword] = useState(false);

  const { login_data } = useSelector((state) => state.CashierReducer);

  const [loginValue, setLoginValue] = useState({
    username: "",
    password: "",
  });

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginValue((prevData) => ({ ...prevData, [name]: value.toLowerCase() }));
  };

  const handleLoginKeyDown = (event) => {
    if (event.keyCode === 32 || event.which === 32) {
      event.preventDefault();
      return;
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginPost(loginValue));
  };

  useEffect(() => {
    if (
      login_data?.status_code == 200 &&
      localStorage.getItem("isLogin") == "true"
    ) {
      localStorage.setItem("username", login_data.username);
      localStorage.setItem("email", login_data.email);
      localStorage.setItem("alamat", login_data.alamat);
      localStorage.setItem("nama_cafe", login_data.nama_cafe);
      localStorage.setItem("isLogin", "true");

      navigate("/homepage-cashier");
    } else if (localStorage.getItem("isLogin") == "false") {
      navigate("/login");
    }
  }, [login_data]);

  return (
    <>
      <NavbarHomepage />
      <div className="container">
        <div className="row wrapperLogin" style={{ marginTop: "3em" }}>
          <div className="col-img col-7 bg-warnings text-center">
            <img
              src={LoginVector}
              alt="Login Cashier"
              style={{ width: "70%", height: "100%" }}
            />
          </div>
          <div className="col-form col-5 px-4 bg-warnings">
            <form onSubmit={handleLoginSubmit} className="me-2">
              <h3 className="titleRegistrasi text-center mt-3 mb-4">Login</h3>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control form-control-login shadow-none"
                  placeholder="Masukan Username anda"
                  maxLength="35"
                  required
                  name="username"
                  onChange={handleLoginChange}
                  onKeyDown={handleLoginKeyDown}
                  value={loginValue.username}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={visiblePassword ? "text" : "password"}
                    className="form-control form-control-login-password shadow-none"
                    placeholder="Masukan password anda"
                    maxLength="15"
                    required
                    name="password"
                    onChange={handleLoginChange}
                    onKeyDown={handleLoginKeyDown}
                    value={loginValue.password}
                  />
                  <span
                    className="password-toggle-icon input-group-text bg-white"
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
              <div className="text-center">
                <button type="submit" className="btn btn-login my-4">
                  Login
                </button>
              </div>
              <p className="text-center text-dont-have-account">
                Tidak mempunyai akun ?{" "}
                <Link
                  onClick={() => dispatch(registerPost([], false))}
                  to="/registrasi"
                  style={{ textDecoration: "none", color: "#ff4500" }}
                >
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
