###
  Example 5 - How to retrieve your payments history.
###
Mollie = require "../lib/mollie"
_ = require "underscore"

class example
  constructor: (request, response) ->

    ###
      Initialize the Mollie API library with your API key.
      See: https://www.mollie.nl/beheer/account/profielen/
    ###
    mollie = new Mollie.API.Client
    mollie.setApiKey "test_b93kfaAsnngIAT3NysojhYvKEJ5YbP"

    ###
      Get the all payments for this API key ordered by newest.
    ###
    mollie.payments.all (payments) ->

      if payments.error
        console.error payments.error
        return response.end()

      response.writeHead 200, "Content-Type": "text/html; charset=utf-8"
      for payment in payments
        response.write "€ #{_.escape(payment.amount)}, status: #{_.escape(payment.status)} <br>"
      response.end()

module.exports = example
