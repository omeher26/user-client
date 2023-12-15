import React from "react";
import "./table.css";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";
import { BASE_URL } from "../../services/helper";
import { NavLink } from "react-router-dom";
import { statuschangefunc } from "../../services/Apis";
import {ToastContainer,toast} from "react-toastify"
import Paginations from "../pagination/Paginations";

const Tables = ({ userdata ,deleteUser,userGet,handlePrevious,handleNext,page,pageCount,setPage }) => {

  const handleChange = async(id,status) => {
    const response = await statuschangefunc (id,status);
    
    if (response.status === 200) {
      userGet();
      toast.success("Status Updated")
    } else {
      toast.error("error")
    }
  }

  return (
    <>
      <div className="container">
        <Row>
          <div className="col mt-3">
            <Card>
              <Table className="align-items-center" responsive="sm">
                <thead className="thead-dark">
                  <tr className="table-dark">
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>status</th>
                    <th>Profile</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {userdata.length > 0 ? (
                    userdata.map((element, index) => {
                      return (
                        <>
                          <tr>
                            <td>{index + 1 + (page - 1)*4}</td>

                            <td>{element.fname + " " + element.lname}</td>

                            <td>{element.email}</td>

                            <td>{element.gender === "Male" ? "M" : "F" }</td>

                            <td className="d-flex align-items-center">
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <Badge
                                    bg={element.status === "Active" ? "light":"warning"}
                                    style={{ fontSize: "14px" }}
                                  >
                                    {element.status} {" "}
                                    <i class="fa-solid fa-angle-down"></i>
                                  </Badge>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={()=> handleChange(element._id,"Active")}>Active</Dropdown.Item>
                                  <Dropdown.Item onClick={()=> handleChange(element._id,"InActive")}>Inactive</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>

                            <td className="img_parent">
                              <img src={`${BASE_URL}/uploads/${element.profile}`} alt="img" />
                            </td>

                            <td>
                              <Dropdown className="text-center">
                                <Dropdown.Toggle
                                  variant="light"
                                  className="action"
                                  id="dropdown-basic"
                                >
                                  <i class="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item className="vie">
                                    <NavLink to={`/userprofile/${element._id}`} className="text-decoration-none " >
                                      <i class="fa-solid fa-eye"></i>{" "}
                                      <span>View</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <NavLink to={`/edit/${element._id}`} className="text-decoration-none ">
                                      <i class="fa-solid fa-pen-to-square"></i>{" "}
                                      <span>Edit</span>
                                    </NavLink>
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <div onClick={() => deleteUser(element._id)} >
                                      <i class="fa-sharp fa-solid fa-trash"></i>{" "}
                                      <span>Delete</span>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                          </tr>
                        </>
                      );
                    })
                  ) : (
                    <div className="no_data text-center">No data found</div>
                  )}
                </tbody>
              </Table>

              <Paginations
                 handlePrevious={handlePrevious} 
                 handleNext={handleNext}
                 page={page}
                 pageCount={pageCount}
                 setPage={setPage}
              />

            </Card>
          </div>
        </Row>
        <ToastContainer/>
      </div>
    </>
  );
};

export default Tables;
