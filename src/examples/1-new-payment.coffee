###
  Example 1 - How to prepare a new payment with the Mollie API.
###
mollie = require("./mollie");
fs = require "fs"

class example
  constructor: (request, response) ->
    ###
      Generate a unique order id for this example. It is important to include this unique attribute
      in the redirectUrl (below) so a proper return page can be shown to the customer.
    ###
    orderId = new Date().getTime()

    ###
      Payment parameters:
        amount        Amount in EUROs. This example creates a € 10,- payment.
        description   Description of the payment.
        redirectUrl   Redirect location. The customer will be redirected there after the payment.
        metadata      Custom metadata that is stored with the payment.
    ###
    mollie.payments.create
      amount: 10.00
      description: "My first API payment"
      redirectUrl: "http://#{request.headers.host}/3-return-page?orderId=#{orderId}"
      metadata:
        orderId: orderId
    , (payment) =>

      if payment.error
        console.error payment.error
        return response.end()

      ###
        In this example we store the order with its payment status in a database.
      ###
      @databaseWrite orderId, payment.status

      ###
        Send the customer off to complete the payment.
      ###
      response.writeHead 302, Location: payment.getPaymentUrl()
      response.end()

  ###
    NOTE: This example uses a text file as a database. Please use a real database like MySQL in production code.
  ###
  databaseWrite: (orderId, paymentStatus) ->
    orderId = parseInt orderId
    fs.writeFile(__dirname + "/orders/order-#{orderId}.txt", paymentStatus)

module.exports = example
