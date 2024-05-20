const { test, expect } = require("@playwright/test");

test.describe("API Response Validation", () => {
  const apiUrl = "http://localhost:3001";

  test("validate Customer API", async ({ request }) => {
    const response = await request.post(apiUrl, {
      data: { name: "LocalUser" },
    });
    const responseBody = await response.json();

    //validate response status code
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // all customers pre-defined for validation
    const expectedCustomers = [
      "Las Vegas Water",
      "Los Angels Water",
      "San Francisco's Water",
      "New York's Water",
      "Miami's Water",
      "Chicago's Water",
      "Denver's Water",
    ];

    // extract customer names from the response
    const actualCustomerNames = responseBody.customers.map(
      (customer) => customer.name
    );

    // all the expected names are present in the answer
    expectedCustomers.forEach((expectedName) => {
      expect(actualCustomerNames).toContain(expectedName);
    });

    // company Size validation
    responseBody.customers.forEach((customer) => {
      // In this check we can see that the application does not follow the established rule.
      // There will be an error in the API request.
      if (customer.employees <= 2500) {
        expect(customer.size).toBe("Small");
      } else if (customer.employees <= 5000) {
        expect(customer.size).toBe("Medium");
      } else {
        expect(customer.size).toBe("Big");
      }
    });

    // contact data validation
    responseBody.customers.forEach((customer) => {
      expect(customer).toHaveProperty("contactInfo");

      // this test fails because it doesn't meet the condition
      // New York's Water (Because the name is missing)
      // Denver's Water (because it doesn't contain the contactInfo)
      if (customer.contactInfo) {
        // Check if the customer has a name and e-mail address in Contact Info.
        const name = customer.contactInfo["name"];
        const email = customer.contactInfo["email"];

        expect(name != undefined, "Name not to be undefined!").toBeTruthy();
        expect(email != undefined, "E-mail not to be undefined!").toBeTruthy();
      }
    });
  });
});
