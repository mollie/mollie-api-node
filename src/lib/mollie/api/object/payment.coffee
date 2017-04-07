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
module.exports = class Payment
	this.STATUS_OPEN      = "open";
	this.STATUS_PENDING   = "pending";
	this.STATUS_CANCELLED = "cancelled";
	this.STATUS_EXPIRED   = "expired";
	this.STATUS_PAID      = "paid";
	this.STATUS_FAILED    = "failed";

	this.RECURRINGTYPE_NONE      = null;
	this.RECURRINGTYPE_FIRST     = "first";
	this.RECURRINGTYPE_RECURRING = "recurring";

	constructor: () ->
		this.resource          = "payment";
		this.id                = null;
		this.mode              = null;
		this.amount            = null;
		this.amountRefunded    = null;
		this.amountRemaining   = null;
		this.description       = null;
		this.method            = null;
		this.status            = null;
		this.createdDatetime   = null;
		this.paidDatetime      = null;
		this.cancelledDatetime = null;
		this.expiredDatetime   = null;
		this.expiryPeriod      = null;
		this.metadata          = null;
		this.details           = null;
		this.locale            = null;
		this.profileId         = null;
		this.customerId        = null;
		this.recurringType     = null;
		this.mandateId         = null;
		this.settlementId      = null;
		this.subscriptionId    = null;
		this.links             = {
			paymentUrl: null,
			redirectUrl: null,
			webhookUrl: null,
		};

	isOpen: () ->
		return this.status == this.constructor.STATUS_OPEN;

	isPaid: () ->
		return !!this.paidDatetime;

	getPaymentUrl: () ->
		return this.links && this.links.paymentUrl;
