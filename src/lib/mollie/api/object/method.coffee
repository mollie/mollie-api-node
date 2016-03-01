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
module.exports = class Method
	this.IDEAL             = "ideal";
	this.CREDITCARD        = "creditcard";
	this.MISTERCASH        = "mistercash";
	this.SOFORT            = "sofort";
	this.BANKTRANSFER      = "banktransfer";
	this.DIRECTDEBIT       = "directdebit";
	this.BITCOIN           = "bitcoin";
	this.PAYPAL            = "paypal";
	this.BELFIUS           = "belfius";
	this.PAYSAFECARD       = "paysafecard";
	this.PODIUMCADEAUKAART = "podiumcadeaukaart";

	constructor: () ->
		this.resource    = "method";
		this.id          = null;
		this.description = null;
		this.amount      = {
			minimum: null,
			maximum: null,
		};
		this.image       = {
			normal: null,
			bigger: null,
		};

	getMinimumAmount: () ->
		return parseFloat(this.amount?.minimum || "0");

	getMaximumAmount: () ->
		return parseFloat(this.amount?.maximum || "0");
