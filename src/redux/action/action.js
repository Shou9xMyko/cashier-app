import axios from "axios";
import Swal from "sweetalert2";

export const FETCH = "FETCH";
export const ADD_TO_CART = "AddToProduct";
export const FILTER_CATHEGORY_PRODUCT = "filterCathegoryProduct";
export const UPDATE_PRODUCT = "UpdateProduct";
export const SEARCH_PRODUCT = "SearchProduct";
export const CLEAR_CART = "ClearCart";
export const SALES_REPORT = "SalesReport";
export const FETCH_ALL_REPORT = "FetchAllReport";
export const LOGIN = "SuccessLogin";
export const REGISTER = "SuccessRegister";

export const fetchData = (data) => {
  if (typeof data === "object") {
    const categoriesToShow = ["makanan", "minuman", "camilan"];

    const filterData = data.data.payload.filter((obj) => {
      return categoriesToShow.includes(obj.kategori_produk);
    });

    const sortAfterFilterData = filterData.sort((a, b) => {
      return (
        categoriesToShow.indexOf(a.kategori_produk) -
        categoriesToShow.indexOf(b.kategori_produk)
      );
    });

    return {
      type: FETCH,
      data: sortAfterFilterData,
    };
  } else if (typeof data == "string") {
    return async (dispatch) => {
      const response = await axios.get(import.meta.env.VITE_CASHIER_API, {
        params: {
          username: localStorage.getItem("username"),
        },
      });

      console.log(response);

      const filterCathegory = response.data.payload.filter((obj) => {
        return obj.kategori_produk == data;
      });

      dispatch({
        type: FETCH,
        data: filterCathegory,
      });
    };
  }
};

export const addProduct = (product) => {
  return async (dispatch) => {
    await axios.post(
      `${import.meta.env.VITE_CASHIER_API}/add-product`,
      product
    );

    dispatch(getData());
    Swal.fire({
      icon: "success",
      title: "Berhasil Tambah Produk",
      showConfirmButton: false,
      timer: 2000,
    });
  };
};

export const updateProduct = (data) => {
  return async (dispatch) => {
    await axios.patch(
      `${import.meta.env.VITE_CASHIER_API}/update-product`,
      data
    );
    dispatch(getData());

    Swal.fire({
      icon: "success",
      title: "Berhasil Update Produk",
      showConfirmButton: false,
      timer: 2000,
    });
  };
};

export const deleteProduct = (id) => {
  return async (dispatch) => {
    console.log(id);
    await axios.delete(
      `${import.meta.env.VITE_CASHIER_API}/delete-produk/${id}`,
      {
        params: {
          username: localStorage.getItem("username"),
        },
      }
    );

    dispatch(getData());
  };
};

export const getData = () => {
  return async (dispatch) => {
    const response = await axios.get(import.meta.env.VITE_CASHIER_API, {
      params: {
        username: localStorage.getItem("username"),
      },
    });

    dispatch(fetchData(response));
  };
};

export const addToCart = (add_to_cart_product) => {
  return async (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: add_to_cart_product,
    });
  };
};

export const searchProduct = (keyword) => {
  return async (dispatch) => {
    const response = await axios.get(import.meta.env.VITE_CASHIER_API, {
      params: { username: localStorage.getItem("username") },
    });

    const searchProduct = response.data.payload.filter((obj) => {
      return obj.nama_produk.toLowerCase().includes(keyword.toLowerCase());
    });

    dispatch({
      type: FETCH,
      data: searchProduct.length == 0 ? keyword : searchProduct,
    });
  };
};

export const clearCart = (boolean) => {
  return async (dispatch) => {
    dispatch({
      type: CLEAR_CART,
      payload: boolean,
    });
  };
};

export const salesReportInsert = (data_customer, customer_cart) => {
  return async (dispatch) => {
    customer_cart.forEach(async (item, index) => {
      const dataToInsert = {
        id_produk: customer_cart[index].id,
        nomor_pesanan: data_customer.nomor_pesanan,
        no_meja_pelanggan: data_customer.meja_pelanggan,
        nama_pelanggan: data_customer.nama_pelanggan,
        kode_produk: customer_cart[index].kode_produk,
        kategori_produk: customer_cart[index].cathegory_product,
        nama_produk: customer_cart[index].name_product,
        terjual: customer_cart[index].qty,
        harga_produk: customer_cart[index].price_product,
        metode_pembayaran: data_customer.metode_pembayaran,
      };

      await axios.post(
        `${import.meta.env.VITE_CASHIER_API}/laporan-penjualan`,
        dataToInsert,
        {
          params: {
            username: localStorage.getItem("username"),
          },
        }
      );

      dispatch(getData());
    });

    Swal.fire({
      icon: "success",
      title: "Success!!!",
      showConfirmButton: false,
      timer: 2000,
    });
  };
};

export const fetchAllLaporanPenjualan = (data) => {
  return {
    type: FETCH_ALL_REPORT,
    data: data,
  };
};

export const getLaporanPenjualan = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${import.meta.env.VITE_CASHIER_API}/laporan-keseluruhan`,
      {
        params: {
          username: localStorage.getItem("username"),
        },
      }
    );

    dispatch(fetchAllLaporanPenjualan(response.data.data));
  };
};

export const getLaporanPenjualanBulanan = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${import.meta.env.VITE_CASHIER_API}/laporan-bulanan`,
      {
        params: {
          username: localStorage.getItem("username"),
        },
      }
    );

    dispatch(fetchAllLaporanPenjualan(response.data.data));
  };
};

export const getLaporanPenjualanMingguan = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${import.meta.env.VITE_CASHIER_API}/laporan-mingguan`,
      {
        params: {
          username: localStorage.getItem("username"),
        },
      }
    );

    dispatch(fetchAllLaporanPenjualan(response.data.data));
  };
};

export const getLaporanPenjualanHarian = () => {
  return async (dispatch) => {
    const response = await axios.get(
      `${import.meta.env.VITE_CASHIER_API}/laporan-harian`,
      {
        params: {
          username: localStorage.getItem("username"),
        },
      }
    );

    dispatch(fetchAllLaporanPenjualan(response.data.data));
  };
};

const loginResponse = (data) => {
  return {
    type: LOGIN,
    payload: data,
  };
};

export const loginPost = (data) => {
  return async (dispatch) => {
    const response = await axios.post(
      `${import.meta.env.VITE_LOGIN_REGISTER_API}/login`,
      data
    );

    localStorage.setItem("isLogin", "true");

    if (
      response?.data?.message?.errno == 1146 ||
      response?.data?.payload?.data.length == 0 ||
      response?.data?.message == "wrong"
    ) {
      Swal.fire({
        icon: "error",
        title: "Username atau Password salah",
      });
    } else if (response?.data.payload.data.length != 0) {
      dispatch(loginResponse(response.data.payload.data));
      Swal.fire({
        icon: "success",
        title: "Berhasil Login!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
};

export const registerPost = (data, boolean) => {
  return async (dispatch) => {
    try {
      if (data.length == 0) {
        dispatch({
          type: REGISTER,
          payload: boolean,
        });
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_LOGIN_REGISTER_API}/register`,
          data
        );

        console.log(response);

        dispatch({
          type: REGISTER,
          payload: boolean,
        });

        Swal.fire({
          icon: "success",
          title: "Berhasil Registrasi!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan!",
        text: `${error}`,
      });
    }
  };
};
