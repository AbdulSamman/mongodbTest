import { Employee } from "./models/Employee.js";
import { IEmployee } from "./interfaces.js";

export const getEmployees = () => {
  return new Promise<IEmployee[] | {}>(async (resolve, reject) => {
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
      reject(error);
    }
  });
};

export const getEmployee = (id: string) => {
  return new Promise<IEmployee[]>(async (resolve, reject) => {
    try {
      const employee: IEmployee[] = await Employee.findOne({ _id: id });
      resolve(employee);
    } catch (error) {
      reject(error);
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
    <li><a href="employees/63c413bece003d083deefd14">/employees/63c413bece003d083deefd14</a> - show  employee with id</li>
</ul>
	`;
};
