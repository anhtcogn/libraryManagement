import axiosInstance from "./axios";

const getAllBooks = async () => {
  let response = null;
  await axiosInstance
    .get("/book")
    .then((res) => {
      if (res?.status === 200) response = res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

const getBookById = async (id) => {
  await axiosInstance
    .get(`/book/getById?id=${id}`)
    .then((res) => {
      if (res?.status === 200) return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const createBook = async (form) => {
  await axiosInstance
    .post("/book/create", form)
    .then((res) => {
      if (res?.status === 200) return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateBook = async (form) => {
  await axiosInstance
    .put("/book/update", form)
    .then((res) => {
      if (res?.status === 200) return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteBook = async (id) => {
  await axiosInstance
    .delete(`/book/delete?id=${id}`)
    .then((res) => {
      if (res?.status === 200) return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
