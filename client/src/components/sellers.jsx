import React from "react";
import { useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchSellers } from "../store/actionCreator";
import AddSeller from "./AddSeller";

export default function Sellers() {
  const dispatch = useDispatch();
  const { sellers, loading, error } = useSelector((state) => state.sellers);

  useEffect(() => {
    dispatch(fetchSellers());
  }, []);

  console.log(sellers, "sellers");


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
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Seller Code</th>
                <th>Seller Name</th>
                <th>Address</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller, index) => (
                <tr key={index}>
                  <td>{seller.seller_code}</td>
                  <td>{seller.seller_name}</td>
                  <td>{seller.address}</td>
                  <td>Details</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
