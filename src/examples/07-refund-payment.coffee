###
	Example 07 - How to refund a Payment.
###
mollie = require("./mollie");
fs     = require("fs");

class example
	constructor: (request, response) ->
		mollie.payments.all((payments) =>
			payment = payments[0];

			###
				Refund creation parameters.
				See: https://www.mollie.com/en/docs/reference/refunds/create
			###
			mollie.payments_refunds.withParent(payment).create({}, (refund) =>
				if (refund.error)
					console.error(refund.error);
					return response.end();

				response.write("<p>New refund created #{refund.id} (#{refund.amount}).</p>");
				response.end();
			);
		);

	###
		NOTE: This example uses a text file as a database. Please use a real database like MySQL in production code.
	###
	databaseWrite: (orderId, customerStatus) ->
		orderId = parseInt(orderId);
		fs.writeFile(__dirname + "/orders/order-#{orderId}.txt", customerStatus);

module.exports = example
