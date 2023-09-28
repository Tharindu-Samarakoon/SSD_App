import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { APIURL } from "../../API/environment";
import User from "../../../assets/images/user.png";
import Logo from "../../../assets/images/logo.png";
import { toast } from "react-toastify";

class GetAllEmployeePayeedSalary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeList: [],
    };
  }

  async componentDidMount() {
    await axios.get(`${APIURL}/emp_sal/ge_all_salary`).then((response) => {
      this.setState({ employeeList: response.data.EmployeeList });
      console.log("EmployeeList =>", this.state.employeeList);
    });
  }

  onPay(e, id) {
    let updateDetailsStatus = {
      isPay: 1,
    };

    console.log(id);
    axios
      .put(`${APIURL}/emp_sal/pay_salary/${id}`, updateDetailsStatus)
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          toast.success(res.data.message);
          this.props.history.push("/get_all_salary");
        } else {
          toast.error(res.data.message);
        }
      });
  }

  render() {
    return (
      <div>
        <header id="home"></header>
        <div id="wrapper">
          <ul
            className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
            id="accordionSidebar"
          >
            <br />
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="/employee-dash"
            >
              <div
                className="sidebar-brand-icon rotate-n-0"
                style={{
                  width: 50,
                  height: 50,
                  marginRight: 140,
                  marginBottom: 100,
                }}
              >
                <img src={Logo} alt="" />
              </div>
              <div className="sidebar-brand-text mx-3"></div>
            </a>
            <br />
            <br />
            <br />
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
              <a className="nav-link" href="/employee-dash">
                <i className="fas fa-fw fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </li>
            <br />
            <div className="sidebar-heading">Employee Management</div>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/add-new-employee">
                  <button className="dropbtn">
                    <i className="fa fa-plus-circle" /> New Employee
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get-all-employee">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Employee List
                  </button>
                </Link>
              </div>
            </li>

            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_salary">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Salary List
                  </button>
                </Link>
              </div>
            </li>
            <br />
            <li className="nav-item">
              <div className="dropdown">
                <Link to="/get_all_salary_pay">
                  <button className="dropbtn">
                    <i className="fa fa-bars" /> Payeed List
                  </button>
                </Link>
              </div>
            </li>
            <br />
          </ul>

          <div id="content-wrapper" className="d-flex flex-column">
            {/* Main Content */}
            <div id="content">
              {/* Topbar */}
              <nav className="navbar navbar-expand topbar mb-4 static-top">
                <h1 className="h3 mb-2 text-gray-800">
                  All Employee Salary Payeed List
                </h1>
                <ul className="navbar-nav ml-auto">
                  {/* Nav Item - User Information */}
                  <li className="nav-item dropdown no-arrow">
                    <a
                      className="nav-link dropdown-toggle"
                      href="/"
                      id="userDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <img
                        className="img-profile rounded-circle"
                        src={User}
                        alt=""
                      />
                    </a>
                    <div
                      className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                      aria-labelledby="userDropdown"
                    >
                      <div className="dropdown-divider" />
                      <a
                        className="dropdown-item"
                        href="/"
                        data-toggle="modal"
                        data-target="#logoutModal"
                      >
                        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                        Logout
                      </a>
                    </div>
                  </li>
                </ul>
              </nav>
              <div className="container-fluid">
                <p className="mb-4">
                  All Employee Salary Payeed List available in here.
                </p>

                <div className="card shadow mb-4">
                  <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">
                      Check Employee Salary Payeed Details
                    </h6>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        className="table table-bordered"
                        id="dataTable"
                        width="100%"
                        cellSpacing={0}
                      >
                        <thead>
                          <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Post </th>
                            <th>Basic Salary </th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Working Days</th>
                            <th>OT Hours</th>
                            <th>EPF</th>
                            <th>ETF </th>
                            <th>Total Salary </th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tfoot>
                          <tr>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Post </th>
                            <th>Basic Salary </th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Working Days</th>
                            <th>OT Hours</th>
                            <th>EPF</th>
                            <th>ETF </th>
                            <th>Total Salary </th>
                            <th>Status</th>
                          </tr>
                        </tfoot>
                        {this.state.employeeList.length > 0 &&
                          this.state.employeeList.map((item, index) => (
                            <tbody key={index}>
                              <tr>
                                {item.isPay === 1 && (
                                  <>
                                    <td>{item.employee_id}</td>
                                    <td>{item.employee_name}</td>
                                    <td>{item.employee_post}</td>
                                    <td>{item.employee_basicSalary}</td>
                                    <td>{item.employee_start_date}</td>
                                    <td>{item.employee_end_date}</td>
                                    <td>{item.employee_working_days}</td>
                                    <td>{item.employee_ot}</td>
                                    <td>{item.employee_epf}</td>
                                    <td>{item.employee_etf}</td>
                                    <td>{item.employee_totSal}</td>
                                    <td>
                                      <Link
                                        onClick={(e) => {
                                          {
                                            this.onPay(e, item._id);
                                          }
                                        }}
                                      >
                                        <p
                                          className="p-1 mb-1 text-success"
                                          style={{
                                            alignContent: "center",
                                            textAlign: "center",
                                          }}
                                        >
                                          Payeed
                                        </p>
                                      </Link>
                                    </td>
                                  </>
                                )}
                              </tr>
                            </tbody>
                          ))}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.container-fluid */}
            </div>
            {/* End of Main Content */}
            {/* Footer */}
            <footer className="footer bg-white">
              <div className="container my-auto">
                <div className="copyright text-center my-auto text-black ">
                  <span>Copyright © HOTEL ROYAL RAMESSES </span>
                </div>
              </div>
            </footer>
            {/* End of Footer */}
          </div>
          {/* End of Content Wrapper */}
        </div>
        {/* End of Page Wrapper */}
        {/* Scroll to Top Button*/}
        <a className="scroll-to-top rounded" href="#home">
          <i className="fas fa-angle-up" />
        </a>
        <a href="#home" className="move-top text-center">
          <span className="fa fa-level-up" aria-hidden="true" />
        </a>
        <div
          className="modal fade"
          id="logoutModal"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Ready to Leave?
                </h5>
                <button
                  className="close"
                  type="button"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                Select "Logout" below if you are ready to end your current
                session.
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  type="button"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <a className="btn btn-primary" href="/">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GetAllEmployeePayeedSalary;
