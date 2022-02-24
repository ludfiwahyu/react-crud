import React from "react";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchSellers } from "../store/actionCreator";
import { useNavigate } from "react-router-dom";
import AddSeller from "./AddSeller";
import { FcEditImage, FcDeleteColumn, FcViewDetails } from "react-icons/fc";

export default function Sellers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sellers, loading, error } = useSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(fetchSellers());
  }, []);

  const handleDetailProduct = (id) => {
    navigate(`/sellers/products/${id + 1}`);
  };

  return (
    <div className="container">
      <div className="shadow p-3 mb-5 bg-white rounded">
        <h2>Seller List </h2>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-3 mt-4">
            <div className="search">
              <form className="form-inline">
                <input
                  type="search"
                  placeholder="Search"
                  className="form-control"
                />
              </form>
            </div>
          </div>
          <div className="col-sm-3 mt-4">
            <AddSeller />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="table-responsive">
          {loading ? (
            <div className="container">
              <img src={require("../assets/loading.jpg")} />
            </div>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Seller Code</th>
                  <th>Seller Name</th>
                  <th>Address</th>
                  <th>Products</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller, index) => {
                  return (
                    <tr key={index}>
                      <td>{seller.seller_code}</td>
                      <td>{seller.seller_name}</td>
                      <td>{seller.address}</td>
                      <td>
                        <FcViewDetails
                          size="2rem"
                          onClick={(e) => handleDetailProduct(index)}
                        />
                      </td>
                      <td>
                        <FcEditImage
                          size="2rem"
                          // onClick={(e) => handleEditProduct(index)}
                        />
                        <FcDeleteColumn size="2rem" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
