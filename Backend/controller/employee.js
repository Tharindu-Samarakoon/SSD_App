const Employee = require("../model/employee.model");

const EmployeeControllers = {
  addEmplyer: async (req, res) => {
    try {
      const {
        employee_id,
        employee_name,
        employee_address,
        employee_phone,
        employee_email,
        employee_status,
        employee_nic,
        employee_education,
        employee_department,
        employee_post,
        employee_basicSalary,
      } = req.body;

      if (
        !employee_id ||
        !employee_name ||
        !employee_address ||
        !employee_phone ||
        !employee_email ||
        !employee_status ||
        !employee_nic ||
        !employee_education ||
        !employee_department ||
        !employee_post ||
        !employee_basicSalary
      ) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "All details must be filled.",
        });
      }
      //email validation
      if (!validateEmail(employee_email)) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Email is invalid, Please enter a valid email",
        });
      }

      const employeeId = await Employee.findOne({ employee_id });
      if (employeeId) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This employee id already registered.",
        });
      }
       //phone number validation
       if (!validatePhone(employee_phone)) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "Phone number is invalid, Please enter a valid Phone number",
        });
      }

      const employeeName = await Employee.findOne({ employee_name });
      if (employeeName) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This employee already registered.",
        });
      }

      const employeePhone = await Employee.findOne({ employee_phone });
      if (employeePhone) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This phone already exist.",
        });
      }

      const employeeEmail = await Employee.findOne({ employee_email });
      if (employeeEmail) {
        return res.status(200).json({
          code: 400,
          success: false,
          status: "Bad Request",
          message: "This Email already registered.",
        });
      }

      const newEmployee = new Employee({
        employee_id,
        employee_name,
        employee_address,
        employee_phone,
        employee_email,
        employee_status,
        employee_nic,
        employee_education,
        employee_department,
        employee_post,
        employee_basicSalary,
      });

      await newEmployee.save();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        EmployeeDetails: newEmployee,
        message: "Registration was successfully.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getAllEmployees: async (req, res) => {
    try {
      const allEmployees = await Employee.find();

      return res.status(200).json({
        code: 200,
        success: true,
        status: "OK",
        EmployeeList: allEmployees,
        message: "All employee list recieved.",
      });
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  getEmployeeById: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const EmployeeDetails = await Employee.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeDetails: EmployeeDetails,
          message: "Employee details recieved.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  updateEmployeeDetails: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const {
          employee_name,
          employee_address,
          employee_phone,
          employee_email,
          employee_status,
          employee_nic,
          employee_education,
          employee_department,
          employee_post,
          employee_basicSalary,
        } = req.body;

        if (!validateEmail(employee_email)) {
          return res.status(200).json({
            code: 400,
            success: false,
            status: "Bad Request",
            message: "Email is invalid, Please enter a valid email",
          });
        }

        const employeeName = await Employee.findOne({ employee_name });
        const employeePhone = await Employee.findOne({ employee_phone });
        const employeeEmail = await Employee.findOne({ employee_email });
        const employeeNIC = await Employee.findOne({ employee_nic });

        // if (employeeName && employeePhone && employeeEmail && employeeNIC) {
        //   return res.status(200).json({
        //     code: 400,
        //     success: false,
        //     status: "Bad Request",
        //     message: "This employee details already registered.",
        //   });
        // }

        // if (employeeEmail) {
        //   return res.status(200).json({
        //     code: 400,
        //     success: false,
        //     status: "Bad Request",
        //     message: "This employee email already registered.",
        //   });
        // }

        // if (employeePhone) {
        //   return res.status(200).json({
        //     code: 400,
        //     success: false,
        //     status: "Bad Request",
        //     message: "This employee phone already registered.",
        //   });
        // }

        // if (employeeName) {
        //   return res.status(200).json({
        //     code: 400,
        //     success: false,
        //     status: "Bad Request",
        //     message: "This employee name already registered.",
        //   });
        // }

        await Employee.findByIdAndUpdate(req.params.id, {
          employee_name,
          employee_address,
          employee_phone,
          employee_email,
          employee_status,
          employee_nic,
          employee_education,
          employee_department,
          employee_post,
          employee_basicSalary,
        });

        const updateEmployee = await Employee.findById(req.params.id);

        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          UpdateEmployee: updateEmployee,
          message: updateEmployee.employee_name + " updated successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },

  deleteEmployee: async (req, res) => {
    try {
      if (req.params && req.params.id) {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        return res.status(200).json({
          code: 200,
          success: true,
          status: "OK",
          EmployeeDetails: employee,
          message: employee.employee_name + " deleted successfully.",
        });
      }
    } catch (error) {
      return res.status(500).json({
        code: 500,
        success: false,
        status: "Internal Server Error",
        message: error.message,
      });
    }
  },
};

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
function validatePhone(phone){
  const re = 
    /^([0-9]{10})$/;
 return re.test(phone);
}

module.exports = EmployeeControllers;
