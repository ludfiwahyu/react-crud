import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../store/actionCreator";
import { useSelector, useDispatch } from "react-redux";
import "./ProductDetail.css";
import { Table } from "react-bootstrap";
import { useState } from "react";

export default function ProductDetail() {
  const { productDetail, loading } = useSelector((state) => state.sellers);
  const { id } = useParams();
  const { details, setDetails } = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetail(id));
  }, [id]);

  console.log(loading, "loading");
  console.log(productDetail, "details");

  return (
    <div class="container ">
      {loading ? (
        <div className="container">
          <img src={require("../assets/loading.jpg")} />
          {console.log("yes")}
        </div>
      ) : (
        <div className="crud shadow-lg p-3 mb-5 mt-5 bg-body rounded">
          <div class="row ">
            <div className="col-sm3 mt-5 mb-4 text-gred">
              <div className="col-sm3 offset-sm2 mt-5 mb-4">
                <h3>
                  <b>Product Detail</b>
                </h3>
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
                        <tr>
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
    </div>
  );
}
