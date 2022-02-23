import React from "react";
import { Table, Button } from "react-bootstrap";

export default function Sellers() {
  return (
    <div className="container">
      <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
        <div className="row ">
          <div className="col-sm-3 mt-5 mb-4 text-gred">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search Student"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>
          <div
            className="col-sm-3 offset-sm-2 mt-5 mb-4 text-gred"
            style={{ color: "green" }}
          >
            <h2>
              <b>Sellers List</b>
            </h2>
          </div>
          <div className="col-sm-3 offset-sm-1  mt-5 mb-4 text-gred">
            <Button variant="primary">Add New Seller</Button>
          </div>
        </div>
      </div>

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
            <Button variant="primary" />
          </div>
          <p>ya</p>
        </div>
      </div>

      <div className="row">
        <div className="table-responsive">
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>Seller Code</th>
                <th>Seller Name</th>
                <th>Address</th>
                <th>Products</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1899cf60-ce9b-4c48-bea3-380ca3125d82</td>
                <td>ERIGO</td>
                <td>Jakarta</td>
                <td>Action</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
