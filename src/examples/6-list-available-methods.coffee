###
  Example 6 - How to get the currently activated payment methods.
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
    mollie.methods.all (methods) ->

      if methods.error
        console.error methods.error
        return response.end()

      response.writeHead 200, "Content-Type": "text/html; charset=utf-8"
      for method in methods
        response.write "<div style='line-height:40px; vertical-align:top'>"
        response.write "<img src='#{_.escape(method.image.normal)}'>"
        response.write "#{_.escape(method.description)} (#{_.escape(method.id)})</div>"
      response.end()

module.exports = example
