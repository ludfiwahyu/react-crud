import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewSeller } from "../store/actionCreator";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { FcAddColumn } from "react-icons/fc";
import { Modal } from "react-bootstrap";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";

const AddSeller = () => {
  const dispatch = useDispatch();
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
  const { sellers } = useSelector((state) => state.sellers);

  const uniqueId = () => parseInt(Date.now() * Math.random(), 10).toString();

  useEffect(() => {}, [inputSeller]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeSeller = (e) => {
    setInputSeller({
      ...inputSeller,
      id: sellers.length + 1,
      seller_code: uuid(),
      [e.target.name]: e.target.value,
      products: productsFields,
    });
  };

  const handleChangeProduct = (index, e) => {
    const values = [...productsFields];
    values[index]["id"] = uniqueId();
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
    dispatch(addNewSeller(inputSeller));
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

  return (
    <div>
      <div>
        <h6>Add New Seller</h6>
        <FcAddColumn size="2em" onClick={handleShow} />
      </div>

      <div className="model_box">
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Seller</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Seller Name</label>
                <input
                  name="seller_name"
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
                  type="text"
                  className="form-control"
                  placeholder="Enter Address"
                  onChange={(e) => handleChangeSeller(e)}
                />
              </div>

              <h5>Add Products</h5>
              <div className="form-inline">
                {productsFields.map((productsField, index) => (
                  <div key={index}>
                    <h6>Product {index + 1}</h6>
                    <div className="form-group mx-sm-3 mb-2">
                      <label>Product Name</label>
                      <input
                        name="name"
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
                        type="number"
                        className="form-control"
                        placeholder="Enter Products"
                        onChange={(e) => handleChangeProduct(index, e)}
                      />
                    </div>
                  </div>
                ))}
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
      </div>
    </div>
  );
};

export default AddSeller;
