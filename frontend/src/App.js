import React, { Component } from "react";

const serverPort = 3001;
const serverURL = `http://localhost:${serverPort}/`;

class WaterCustomerApp extends Component {
  state = {
    name: null,
    timestamp: null,
    customers: null,
    customer: null,
  };

  async getCustomer(customer) {
    this.setState({ customer });
  }

  async getCustomers() {
    const userName = document.getElementById("name").value;
    if (!userName || userName === "") {
      alert("Please provide your name");
      return;
    }

    const axios = require("axios");
    const server = axios.create({
      baseURL: serverURL,
    });

    try {
      const response = await server.post("/", { name: userName });
      const { name, timestamp, customers } = response.data;
      this.setState({ name, timestamp, customers });
    } catch (error) {
      alert(error);
    }
  }

  render() {
    return (
      <div>
        {!this.state.name && (
          <div className="nameform">
            <p>Please provide your name:</p>
            <p>
              <input type="text" id="name" />
              <input
                type="button"
                value="Submit"
                onClick={this.getCustomers.bind(this)}
              />
            </p>
          </div>
        )}
        {this.state.name && (
          <div>
            <p>
              Hi <b>{this.state.name}</b>. It is now{" "}
              <b>{this.state.timestamp}</b> and here is our customer list. Click
              on each of them to view their contact details.
            </p>
            {!this.state.customer && (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th># of Employees</th>
                      <th>Size</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.customers.map((customer) => (
                      <tr key={customer.id}>
                        <td>
                          <a
                            href="#"
                            onClick={() => this.getCustomer(customer)}
                          >
                            {customer.name}
                          </a>
                        </td>
                        <td>{customer.employees}</td>
                        <td>{customer.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {this.state.customer && (
              <div>
                <p>
                  <b>Customer Details</b>
                </p>
                <p>
                  <b>Name:</b> {this.state.customer.name}
                </p>
                <p>
                  <b># of Employees:</b> {this.state.customer.employees}
                </p>
                <p>
                  <b>Size:</b> {this.state.customer.size}
                </p>
                <p>
                  <b>Contact:</b> {this.state.customer.contactInfo.name} (
                  {this.state.customer.contactInfo.email})
                </p>
                <input
                  type="button"
                  value="Back to the list"
                  onClick={() => this.setState({ customer: null })}
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

function App() {
  return (
    <div>
      <h1>Welcome to Water Customer App</h1>
      <WaterCustomerApp />
    </div>
  );
}

export default App;
