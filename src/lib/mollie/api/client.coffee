###
  Copyright (c) 2013, Mollie B.V.
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
Mollie = API: {}
url = require "url"
fs = require "fs"
https = require "https"
os = require "os"
Payments = require "./resource/payments"
Methods = require "./resource/methods"
Issuers = require "./resource/issuers"

module.exports = class Mollie.API.Client
  @version = "1.0.4"

  constructor: ->
    @config =
      endpoint: "https://api.mollie.nl"
      version: "v1"
      key: ""

    @payments = new Payments @
    @methods = new Methods @
    @issuers = new Issuers @

  setApiEndpoint: (endpoint) ->
    @config.endpoint = endpoint

  setApiKey: (key) ->
    @config.key = key

  callRest: (method, resource, obj, data, callback) ->
    id = obj.id || ''
    uname = [os.type(), os.release(), os.platform(), os.arch(), os.hostname()].join(" ")

    uri = "#{@config.endpoint}/#{@config.version}/#{resource}/#{id}"
    if (typeof obj.count != 'undefined' && typeof obj.offset != 'undefined')
      uri = "#{@config.endpoint}/#{@config.version}/#{resource}?count=#{obj.count}&offset=#{obj.offset}"

    parsedUrl = url.parse uri
    parsedUrl.method = method
    parsedUrl.rejectUnauthorized = true
    parsedUrl.cert = fs.readFileSync __dirname + "/cacert.pem"
    parsedUrl.headers =
      Authorization: "Bearer #{@config.key}"
      Accept: "application/json"
      'User-Agent': "Mollie/#{@constructor.version} Node/#{process.version}"
      'X-Mollie-Client-Info': uname

    request = https.request parsedUrl

    request.on "response", (response) ->
      body = ""
      response.on "data", (data) ->
        body += data.toString()
      response.on "end", ->
        callback JSON.parse(body)

    request.write JSON.stringify(data)
    request.end()
