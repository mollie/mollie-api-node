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
Mollie = API: Object: {}

module.exports = class Mollie.API.Object.Payment
  @STATUS_OPEN      = "open"
  @STATUS_CANCELLED = "cancelled"
  @STATUS_EXPIRED   = "expired"
  @STATUS_PAID      = "paid"

  constructor: ->
    @id = null
    @mode = null
    @amount = null
    @description = null
    @method = null
    @status = null
    @createdDatetime = null
    @paidDatetime = null
    @cancelledDatetime = null
    @expiredDatetime = null
    @metadata = null
    @details = null
    @links =
      paymentUrl: null
      redirectUrl: null

  isOpen: ->
    @status == @constructor.STATUS_OPEN

  isPaid: ->
    !!@paidDatetime

  getPaymentUrl: ->
    @links && @links.paymentUrl
