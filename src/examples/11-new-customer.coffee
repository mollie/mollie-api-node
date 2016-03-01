###
	Example 11 - How to create a new customer in the Mollie API.
###
mollie = require("./mollie");
fs     = require("fs");

class example
	constructor: (request, response) ->
		###
			Customer creation parameters.
			See: https://www.mollie.com/en/docs/reference/customers/create
		###
		mollie.customers.create({
			name: "Luke Skywalker",
			email: "luke@example.org",
			metadata: {
				isJedi: true,
			},
		}, (customer) =>
			if (customer.error)
				console.error(customer.error);
				return response.end();

			response.write("<p>New customer created #{customer.id} (#{customer.name}).</p>");
			response.end();
		);

module.exports = example
