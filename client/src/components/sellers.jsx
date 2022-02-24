import React from "react";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchSellers, deleteProduct } from "../store/actionCreator";
import { useNavigate } from "react-router-dom";
import AddSeller from "./AddSeller";
import { FcEditImage, FcDeleteColumn, FcViewDetails } from "react-icons/fc";

export default function Sellers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sellers, loading, error } = useSelector((state) => state.sellers);
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    dispatch(fetchSellers());
  }, []);

  const handleDetailProduct = (id) => {
    navigate(`/sellers/products/${id + 1}`);
  };

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct(id));
  };

  
  const searchText = (e) => {
    const { value } = e.target;
    setFilterData(value);
    console.log(value);
  };

  let dataSearch = sellers.filter((el) => {
    return el.seller_name.toLowerCase().includes(filterData.toLowerCase());
  });


  return (
    <div className="container">
      <div className="shadow p-3 mb-5 bg-white rounded">
        <h2>Seller List </h2>
        <div className="row d-flex justify-content-between">
          <div className="col-sm-3 mt-4">
            <div className="search">
              <form className="form-inline">
                <input
                  className="form-control form-control-sm ml-3 w-75"
                  type="text"
                  placeholder="Search ny Seller Name"
                  aria-label="Search"
                  value={filterData}
                  onChange={searchText}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataSearch.map((seller, index) => {
                  return (
                    <tr key={index}>
                      <td>{seller.seller_code}</td>
                      <td>{seller.seller_name}</td>
                      <td>{seller.address}</td>
                      <td>
                        <FcEditImage
                          size="2rem"
                          onClick={(e) => handleDetailProduct(index)}
                        />
                        
                        <FcDeleteColumn size="2rem" onClick={() => handleDeleteProduct(seller.id)}/>
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
