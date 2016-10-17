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
List = require("../object/list");

module.exports = class Base
	this.api      = null;
	this.resource = "unknown";
	this.object   = (->);
	this.parentId = null;

	constructor: (api) ->
		this.api = api;

	copy: (body, object) ->
		for key of object
			if (typeof object[key] != "function")
				object[key] = body[key];
		return object;

	create: (data, callback) ->
		this.api.callRest(
			"POST", this.getResourceName(), null, data, (body) =>
				if (body.error)
					return callback(body);
				callback(this.copy(body, new this.constructor.object));
		);

	get: (id, callback) ->
		this.api.callRest(
			"GET", this.getResourceName(), id, null, (body) =>
				if (body.error)
					return callback(body);
				callback(this.copy(body, new this.constructor.object));
		);

	update: (id, data, callback) ->
		this.api.callRest(
			"POST", this.getResourceName(), id, data, (body) =>
				if (body.error)
					return callback(body);
				callback(this.copy(body, new this.constructor.object));
		);

	delete: (id, callback) ->
		this.api.callRest(
			"DELETE", this.getResourceName(), id, null, (body) =>
				if (body.error)
					return callback(body);
				callback(this.copy(body, new this.constructor.object));
		);

	cancel: (id, callback) ->
		this.delete(id, callback);

	all: (callback) ->
		this.api.callRest(
			"GET", this.getResourceName(), null, data, (body) =>
				if (body.error)
					return callback(body);

				list = new List;
				list.totalCount = body.totalCount;
				list.offset = body.offset;
				list.links = body.links;

				for item of body.data
					list.push(this.copy(body.data[item], new this.constructor.object));

				callback(list);
		);

	getResourceName: () ->
		if (this.constructor.resource.indexOf("_") >= 0)
			if (!this.parentId)
				throw new Error("Missing parent id");
			parts = this.constructor.resource.split("_");
			return parts[0] + "/" + this.parentId + "/" + parts[1];
		return this.constructor.resource;

	withParent: (parent) ->
		return this.withParentId(parent.id);

	withParentId: (parentId) ->
		this.parentId = parentId;
		return this;
