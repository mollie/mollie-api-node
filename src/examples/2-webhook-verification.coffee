###
  Example 2 - How to verify Mollie API Payments in a webhook.
###
mollie = require("./mollie");
querystring = require "querystring"
fs = require "fs"

class example
  constructor: (request, response) ->
    @body = ""

    request.on "data", (data) => @body += data
    request.on "end", () =>
      @body = querystring.parse(@body)
      return response.end() unless @body?.id

      ###
        Retrieve the payment's current state.
      ###
      mollie.payments.get @body.id, (payment) =>

        if payment.error
          console.error payment.error
          return response.end()

        ###
          Update the order in the database.
        ###
        @databaseWrite payment.metadata.orderId, payment.status

        if payment.isPaid()
          ###
            At this point you'd probably want to start the process of delivering the product to the customer.
          ###
        else unless payment.isOpen()
          ###
            The payment isn't paid and isn't open anymore. We can assume it was aborted.
          ###

      response.end()

  ###
    NOTE: This example uses a text file as a database. Please use a real database like MySQL in production code.
  ###
  databaseWrite: (orderId, paymentStatus) ->
    orderId = parseInt orderId
    fs.writeFile(__dirname + "/orders/order-#{orderId}.txt", paymentStatus)

module.exports = example
