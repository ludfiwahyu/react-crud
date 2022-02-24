import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductDetail, getImage } from "../store/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetail.css";
import { Table, Modal, Button } from "react-bootstrap";
import { useState } from "react";

import { FcEditImage } from "react-icons/fc";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

export default function ProductDetail() {
  const { productDetail, loading } = useSelector((state) => state.sellers);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [inputSeller, setInputSeller] = useState({
    id: "",
    seller_code: "",
    seller_name: "",
    address: "",
    products: [],
  });
  const [productsFields, setProductsFields] = useState([
    {
      id: "",
      name: "",
      price: "",
      stock: "",
    },
  ]);
  const { sellers, apiImage } = useSelector((state) => state.sellers);
  
  useEffect(() => {
    dispatch(fetchProductDetail(id));
    dispatch(getImage());
    // if (productDetail) {
    //   setInputSeller(productDetail);
    //   setProductsFields([...productsFields, productDetail.products]);
    // }
  }, [id]);

  useEffect(() => {
    if (productDetail) {
      setInputSeller(productDetail);
      setProductsFields([...productsFields, productDetail.products]);
    }
  }, [inputSeller]);
  console.log(inputSeller, "ini inputSeller");
  useEffect(() => {}, [inputSeller]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeSeller = (e) => {
    console.log(e.target.name, "name");
    console.log(e.target.value, "value");
    setInputSeller({
      ...inputSeller,
      id: sellers.length + 1,
      [e.target.name]: e.target.value,
      products: productsFields,
    });
  };

  const handleChangeProduct = (index, e) => {
    const values = [...productsFields];
    values[index][e.target.name] = e.target.value;
    setProductsFields(values);
    setInputSeller({
      ...inputSeller,
      products: values,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInputSeller({
      ...inputSeller,
      products: productsFields,
    });
    // dispatch(addNewSeller(inputSeller));
    console.log(inputSeller, "inputSellerSubmit");
    handleClose();
  };

  const handleAddProduct = () => {
    setProductsFields([...productsFields, { name: "", price: "", stock: "" }]);
  };

  const handleRemoveProduct = (index) => {
    const values = [...productsFields];
    values.splice(index, 1);
    setProductsFields(values);
  };

  const BtnHome = (id) => {
    navigate(`/`);
  };

  return (
    <div className="container ">
      {loading ? (
        <div className="container">
          <img src={require("../assets/loading.jpg")} />
        </div>
      ) : (
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div className="row ">
            <div className="col-sm3 mt-5 mb-4 text-gred">
              <div className="col-sm3 offset-sm2 mt-5 mb-4">
                <h3>
                  <b>Product Detail</b>
                </h3>
              </div>
              <div
                className="col-sm3 offset-sm2 mt-5 mb-4 ms-5"
                style={{ textAlign: "left" }}
              >
                <img src={apiImage} alt="sellerProfile" />
              </div>
              <div
                className="col-sm3 offset-sm2 mt-5 mb-4 ms-5"
                style={{ textAlign: "left" }}
              >
                <div className="row">
                  <div className="col-md-3">
                    <label>Seller Code</label>
                  </div>
                  <div className="col-md-6">
                    <p>{productDetail.seller_code}</p>
                  </div>
                  <div className="col-md-3 d-flex">
                    <FcEditImage size="2rem" onClick={handleShow} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label>Seller Name</label>
                  </div>
                  <div className="col-md-6">
                    <p>{productDetail.seller_name}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-3">
                    <label>Address</label>
                  </div>
                  <div className="col-md-6">
                    <p>{productDetail.address}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetail.products?.map((el, index) => {
                      return (
                        <tr key={index}>
                          <td>{el.id}</td>
                          <td>{el.name}</td>
                          <td>{el.price}</td>
                          <td>{el.stock}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="model_box">
      {inputSeller ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Seller Name</label>
                <input
                  name="seller_name"
                  value={inputSeller?.seller_name}
                  type="text"
                  className="form-control"
                  placeholder="Enter Seller Name"
                  onChange={(e) => handleChangeSeller(e)}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  name="address"
                  value={inputSeller?.address}
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  onChange={(e) => handleChangeSeller(e)}
                />
              </div>

              <h5>Edit Products</h5>
              <div className="form-inline">
                {inputSeller.products?.map((el, index) => {
                  return (
                    <div key={index}>
                      <h6>Product {index + 1}</h6>
                      <div className="form-group mx-sm-3 mb-2">
                        <label>Product Name</label>
                        <input
                          name="name"
                          value={el.name}
                          type="text"
                          className="form-control"
                          placeholder="Enter Products"
                          onChange={(e) => handleChangeProduct(index, e)}
                        />
                      </div>
                      <div className="form-group mx-sm-3 mb-2">
                        <label>Product Price</label>
                        <input
                          name="price"
                          value={el.price}
                          type="number"
                          className="form-control"
                          placeholder="Enter Products"
                          onChange={(e) => handleChangeProduct(index, e)}
                        />
                      </div>
                      <div className="form-group mx-sm-3 mb-2">
                        <label>Product Stock</label>
                        <input
                          name="stock"
                          value={el.stock}
                          type="number"
                          className="form-control"
                          placeholder="Enter Products"
                          onChange={(e) => handleChangeProduct(index, e)}
                        />
                      </div>
                    </div>
                  );
                })}
                <AiFillPlusCircle size="2rem" onClick={handleAddProduct} />
                <AiFillMinusCircle size="2rem" onClick={handleRemoveProduct} />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </Modal.Body>

          <Modal.Footer>
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      ) : (
        <div className="container">
          <img src={require("../assets/loading.jpg")} />
        </div>
      )}
      </div>

      <div className="mt-4 " style={{ textAlign: "left" }}>
        <Button variant="primary" onClick={BtnHome}>Home</Button>
      </div>
    </div>
  );
}
