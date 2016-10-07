###
  Copyright (c) 2016, Mollie B.V.
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  - Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE AUTHOR AND CONTRIBUTORS ``AS IS'' AND ANY
  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE AUTHOR OR CONTRIBUTORS BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
  LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
  OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
  DAMAGE.

  @license     Berkeley Software Distribution License (BSD-License 2) http://www.opensource.org/licenses/bsd-license.php
  @author      Mollie B.V. <info@mollie.nl>
  @copyright   Mollie B.V.
  @link        https://www.mollie.nl
###
url   = require("url");
fs    = require("fs");
https = require("https");

Payments               = require("./resource/payments");
PaymentsRefunds        = require("./resource/payments/refunds");
Methods                = require("./resource/methods");
Issuers                = require("./resource/issuers");
Customers              = require("./resource/customers");
CustomersPayments      = require("./resource/customers/payments");
CustomersMandates      = require("./resource/customers/mandates");
CustomersSubscriptions = require("./resource/customers/subscriptions");

module.exports = class Client
	this.version = "1.3.0";

	constructor: () ->
		this.config = {
			endpoint: "https://api.mollie.nl",
			version: "v1",
			key: "",
		};

		this.payments                = new Payments(this);
		this.payments_refunds        = new PaymentsRefunds(this);
		this.methods                 = new Methods(this);
		this.issuers                 = new Issuers(this);
		this.customers               = new Customers(this);
		this.customers_payments      = new CustomersPayments(this);
		this.customers_mandates      = new CustomersMandates(this);
		this.customers_subscriptions = new CustomersSubscriptions(this);

	setApiEndpoint: (endpoint) ->
		this.config.endpoint = endpoint;

	setApiKey: (key) ->
		this.config.key = key;

	callRest: (method, resource, id, data, callback) ->
		id = id || '';

		parsedUrl = url.parse("#{@config.endpoint}/#{@config.version}/#{resource}/#{id}");
		parsedUrl.method             = method;
		parsedUrl.rejectUnauthorized = true;
		parsedUrl.cert               = fs.readFileSync(__dirname + "/cacert.pem");
		parsedUrl.headers            = {
			Authorization: "Bearer #{@config.key}",
			Accept: "application/json",
			'User-Agent': "Mollie/#{@constructor.version} Node/#{process.version}"
		};

		request = https.request(parsedUrl);

		request.on("response", (response) ->
			body = "";
			response.on("data", (data) ->
				body += data.toString();
			);
			response.on("end", ->
        if body.length
          parsedBody = {}
          try
              parsedBody = JSON.parse(body)
          catch e
              console.log(e)

          callback(parsedBody)
        else
          callback({})

			);
		);

		request.write(JSON.stringify(data));
		request.end();

		return request;
