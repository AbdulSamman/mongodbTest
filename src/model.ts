import { Employee } from "./models/Employee.js";
import { IEmployee } from "./interfaces.js";

export const getEmployees = () => {
  return new Promise<IEmployee[]>(async (resolve, reject) => {
    try {
      const employees: IEmployee[] = await Employee.find().select(
        "firstName lastName title notes"
      );
      if (employees.length > 0) {
        resolve(employees);
      } else {
        reject({
          status: "error",
          message: "collection not found",
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const getEmployee = (id: string) => {
  return new Promise<IEmployee[]>(async (resolve, reject) => {
    try {
      const employee: IEmployee[] = await Employee.findOne({ _id: id });
      if (!employee) {
        reject({
          status: "error",
          message: `item with id "${id}" could not found or delete`,
        });
      } else {
        resolve(employee);
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const addEmployee = (employeeData: IEmployee) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   const employee = new Employee(employeeData);
      //   const addedEmployee = await employee.save();
      const addedEmployee = await Employee.create(employeeData);
      resolve({
        status: "success",
        newId: addedEmployee._id,
      });
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const deleteEmployee = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const deleteOne = await Employee.deleteOne({ _id: id });
      if (deleteOne.deletedCount === 1) {
        resolve({
          status: "success",
          news: deleteOne,
          message: `${id} has been deleted`,
        });
      } else {
        reject({
          status: "error",
          message: `item with id "${id}" could not found or delete`,
        });
      }
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const editEmployee = (id: string, employee: IEmployee) => {
  return new Promise(async (resolve, reject) => {
    try {
      const oldEmployee = await Employee.find({ _id: id });
      const editOne = await Employee.updateOne(
        { _id: id },
        { $set: { ...employee } }
      );
      const newEmployee = await Employee.find({ _id: id });
      if (oldEmployee.length === 0) {
        resolve({
          status: "error",
          message: `employee with id "${id}" not found`,
        });
      }
      resolve({
        status: "success",
        news: {
          editOne,
        },
        updated: {
          from: oldEmployee,
          to: newEmployee,
        },
        message: `${id} has been updated`,
      });
    } catch (error) {
      reject({
        status: "error",
        message: error.message,
      });
    }
  });
};

export const getApiInstructions = () => {
  return `
    
    <style>
	body {
		background-color: #444;
		padding: 1rem;
		color: #fff;
		font-family: courier;
	}
	code {
		background-color: #333;
	}
	a {
		color: yellow;
	}
</style>
<h1>Employee Site API</h1>
<ul>
	<li><a href="employees">/employees</a> - show all employees</li>
    <li><a href="employee/63c413bece003d083deefd14">/employee/63c413bece003d083deefd14</a> - get  employee with id</li>
</ul>
	`;
};
