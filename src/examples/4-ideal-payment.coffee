###
  Example 4 - How to prepare an iDEAL payment with the Mollie API.
###
mollie = require("./mollie");
querystring = require "querystring"
fs = require "fs"
_ = require "underscore"

class example
  constructor: (request, response) ->
    @body = ""

    request.on "data", (data) => @body += data
    request.on "end", () =>
      @body = querystring.parse(@body)

      ###
        First, let the customer pick the bank in a simple HTML form. This step is actually optional.
      ###
      if request.method != "POST"
        issuers = mollie.issuers.all (issuers) ->
          response.writeHead 200, 'Content-Type': "text/html; charset=utf-8"
          response.write '<form method="post">Select your bank: <select name="issuer">'

          for issuer in issuers
            if issuer.method == Mollie.API.Object.Method.IDEAL
              response.write "<option value=\"#{_.escape(issuer.id)}\">#{_.escape(issuer.name)}</option>";

          response.write '<option value="">or select later</option>';
          response.write '</select><button>OK</button></form>';
          return response.end()
        return

      ###
        Generate a unique order id for this example. It is important to include this unique attribute
        in the redirectUrl (below) so a proper return page can be shown to the customer.
      ###
      orderId = new Date().getTime()

      ###
        Payment parameters:
          amount        Amount in EUROs. This example creates a € 10,- payment.
          method        Payment method "ideal".
          description   Description of the payment.
          redirectUrl   Redirect location. The customer will be redirected there after the payment.
          metadata      Custom metadata that is stored with the payment.
          issuer        The customer's bank. If empty the customer can select it later.
      ###
      mollie.payments.create
        amount: 25.00
        method: Mollie.API.Object.Method.IDEAL
        description: "My first iDEAL payment"
        redirectUrl: "http://#{request.headers.host}/3-return-page?orderId=#{orderId}"
        metadata:
          orderId: orderId
        issuer: @body.issuer || null
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
