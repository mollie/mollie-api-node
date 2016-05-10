###
	Example 13 - How to list all Customer Payments.
###
mollie = require("./mollie");

class example
	constructor: (request, response) ->
		###
			Retrieve the last created customer for this example.
			If no customers are created yet, run example 11.
		###
		mollie.customers.all((customers) =>
			###
				Retrieve the last created customer for this example.
				If no customers are created yet, run example 11.
			###
			customer = customers[0];

			###
				Get the all payments for this API key ordered by newest.
			###
			mollie.customers_payments.withParent(customer).all((payments) ->
				if (payments.error)
					console.error(payments.error)
					return response.end();

				response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
				for payment in payments
					response.write("€ #{payment.amount}, status: #{payment.status} <br>");
				response.end();
			);
		);

module.exports = example
