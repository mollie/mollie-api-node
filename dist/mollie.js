'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var fs = _interopDefault(require('fs'));
var path = _interopDefault(require('path'));
var https = _interopDefault(require('https'));
var assign = _interopDefault(require('lodash/assign'));
var qs = _interopDefault(require('qs'));
var _toPlainObject = _interopDefault(require('lodash/toPlainObject'));
var omit = _interopDefault(require('lodash/omit'));

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};











var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};





var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * Create pre-configured httpClient instance
 * @private
 */
function createHttpClient(httpClient, httpClientParams) {
  var insecure = httpClientParams.insecure,
      host = httpClientParams.host,
      defaultHostname = httpClientParams.defaultHostname,
      httpAgent = httpClientParams.httpAgent,
      httpsAgent = httpClientParams.httpsAgent,
      proxy = httpClientParams.proxy;
  // prettier-ignore

  var _ref = host && host.split(':') || [],
      _ref2 = slicedToArray(_ref, 2),
      _ref2$ = _ref2[0],
      hostname = _ref2$ === undefined ? defaultHostname : _ref2$,
      _ref2$2 = _ref2[1],
      port = _ref2$2 === undefined ? insecure ? 80 : 443 : _ref2$2;

  var baseURL = (insecure ? 'http' : 'https') + '://' + hostname + ':' + port + '/v1/';
  var headers = assign(httpClientParams.headers, {
    'user-agent': 'node.js/' + process.version,
    'Accept-Encoding': 'gzip'
  });

  return httpClient.create({
    baseURL: baseURL,
    headers: headers,
    httpAgent: httpAgent,
    httpsAgent: httpsAgent,
    proxy: proxy,
    paramsSerializer: qs.stringify
  });
}

/**
 * A list helper class
 */
var List = function (_Array) {
  inherits(List, _Array);

  function List() {
    classCallCheck(this, List);

    var _this = possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

    _this.totalCount = null;
    _this.offset = null;
    _this.links = null;
    return _this;
  }

  return List;
}(Array);

/* eslint-disable new-cap */
/**
 * The base resource
 * @param {Object} httpClient
 * @private
 */

var Resource = function () {
  /**
   * Constructor
   * @param httpClient
   */
  function Resource(httpClient) {
    classCallCheck(this, Resource);

    this.httpClient = httpClient;
  }

  /**
   * Error handler
   * @param {*} response
   * @param {function} [cb]
   * @since 2.0.0
   * @private
   */


  createClass(Resource, [{
    key: 'getClient',


    /**
     * Get the API client
     * @returns {Object} httpClient
     * @since 2.0.0
     * @private
     */
    value: function getClient() {
      return this.httpClient;
    }

    /**
     * Set the parent ID by providing the parent
     * @param parent
     * @since 1.1.1
     * @deprecated
     */

  }, {
    key: 'withParent',
    value: function withParent(parent) {
      if (parent && parent.id) {
        this.setParentId(parent.id);
      }
      return this;
    }

    /**
     * Set the parent ID
     * @param {number} parentId
     * @since 2.0.0
     * @protected
     */

  }, {
    key: 'setParentId',
    value: function setParentId(parentId) {
      this.parentId = parentId;
    }

    /**
     * If the parent ID is set
     * @returns {boolean}
     * @since 2.0.0
     */

  }, {
    key: 'hasParentId',
    value: function hasParentId() {
      return !!this.parentId;
    }

    /**
     * Create a resource URL with the parent ID
     * @returns {string} resourceUrl
     * @since 2.0.0
     * @private
     */

  }, {
    key: 'getResourceUrl',
    value: function getResourceUrl() {
      if (this.constructor.resource.indexOf('_') !== -1) {
        var parts = this.constructor.resource.split('_');
        return parts[0] + '/' + this.parentId + '/' + parts[1];
      }

      return this.constructor.resource;
    }

    /**
     * Create a resource by ID
     * @param {Object} [data]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.0.0
     */

  }, {
    key: 'create',
    value: function create(data, cb) {
      var _this = this;

      if (typeof data === 'function') {
        cb = data; // eslint-disable-line no-param-reassign
      }

      return this.getClient().post(this.getResourceUrl(), data).then(function (response) {
        var model = new _this.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      }).catch(function (error) {
        return Resource.errorHandler(error.response, cb);
      });
    }

    /**
     * Get a resource by ID
     * @param {number} id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.0.0
     */

  }, {
    key: 'get',
    value: function get$$1(id, params, cb) {
      var _this2 = this;

      if (typeof params === 'function') {
        cb = params; // eslint-disable-line no-param-reassign
      }

      return this.getClient().get(this.getResourceUrl() + '/' + id, { params: params }).then(function (response) {
        var model = new _this2.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      }).catch(function (error) {
        return Resource.errorHandler(error.response, cb);
      });
    }

    /**
     * Get all resources
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.0.0
     */

  }, {
    key: 'all',
    value: function all(params, cb) {
      var _this3 = this;

      if (typeof params === 'function') {
        cb = params; // eslint-disable-line no-param-reassign
      }

      return this.getClient().get(this.getResourceUrl(), { params: params }).then(function (response) {
        var _response$data = response.data,
            totalCount = _response$data.totalCount,
            offset = _response$data.offset,
            _response$data$links = _response$data.links,
            links = _response$data$links === undefined ? [] : _response$data$links,
            _response$data$data = _response$data.data,
            data = _response$data$data === undefined ? [] : _response$data$data;

        var list = new List();
        list.totalCount = totalCount;
        list.offset = offset;
        list.links = links;
        list.push.apply(list, toConsumableArray(data.map(function (resource) {
          return new _this3.constructor.model(resource);
        })));

        if (cb) {
          return cb(null, list);
        }
        return list;
      }).catch(function (error) {
        return Resource.errorHandler(error.response, cb);
      });
    }

    /**
     * Update a resource by ID
     * @param {number} id
     * @param {Object} [data]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.0.0
     */

  }, {
    key: 'update',
    value: function update(id, data, cb) {
      var _this4 = this;

      if (typeof data === 'function') {
        cb = data; // eslint-disable-line no-param-reassign
      }

      return this.getClient().post(this.getResourceUrl() + '/' + id, data).then(function (response) {
        var model = new _this4.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      }).catch(function (error) {
        return Resource.errorHandler(error.response, cb);
      });
    }

    /**
     * Delete a resource by ID
     * @param {number} id
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.0.0
     */

  }, {
    key: 'delete',
    value: function _delete(id, cb) {
      var _this5 = this;

      return this.getClient().delete(this.getResourceUrl() + '/' + id).then(function (response) {
        var model = new _this5.constructor.model(response.data);

        if (cb) {
          return cb(null, model);
        }
        return model;
      }).catch(function (error) {
        return Resource.errorHandler(error.response, cb);
      });
    }
  }], [{
    key: 'errorHandler',
    value: function errorHandler(response, cb) {
      var error = response && response.data || response;

      if (cb) {
        return cb(error);
      }
      throw error;
    }
  }]);
  return Resource;
}();

/**
 * Base model
 */

var Model = function () {
  function Model() {
    classCallCheck(this, Model);
  }

  createClass(Model, [{
    key: 'toPlainObject',

    /**
     * Converts a model into a plain object
     * @returns {Object}
     */
    value: function toPlainObject() {
      return _toPlainObject(this);
    }
  }]);
  return Model;
}();

/**
 * The `Payment` model
 */

var Payment = function (_Model) {
  inherits(Payment, _Model);

  function Payment(props) {
    classCallCheck(this, Payment);

    var _this = possibleConstructorReturn(this, (Payment.__proto__ || Object.getPrototypeOf(Payment)).call(this, props));

    var defaults$$1 = {
      resource: 'payment',
      id: null,
      mode: null,
      amount: null,
      amountRefunded: null,
      amountRemaining: null,
      description: null,
      method: null,
      status: null,
      createdDatetime: null,
      paidDatetime: null,
      cancelledDatetime: null,
      expiredDatetime: null,
      expiryPeriod: null,
      metadata: null,
      details: null,
      locale: null,
      profileId: null,
      customerId: null,
      recurringType: null,
      mandateId: null,
      settlementId: null,
      subscriptionId: null,
      links: {
        paymentUrl: null,
        webhookUrl: null,
        redirectUrl: null
      }
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  /**
   * If the payment is open
   * @returns {boolean}
   */


  createClass(Payment, [{
    key: 'isOpen',
    value: function isOpen() {
      return this.status === Payment.STATUS_OPEN;
    }

    /**
     * If the payment is paid
     * @returns {boolean}
     */

  }, {
    key: 'isPaid',
    value: function isPaid() {
      return !!this.paidDatetime;
    }

    /**
     * If the payment is cancelled
     * @returns {boolean}
     */

  }, {
    key: 'isCancelled',
    value: function isCancelled() {
      return !!this.cancelledDatetime;
    }

    /**
     * If the payment is expired
     * @returns {boolean}
     */

  }, {
    key: 'isExpired',
    value: function isExpired() {
      return !!this.expiredDatetime;
    }

    /**
     * Get the payment URL
     * @returns {links|{paymentUrl, webhookUrl, redirectUrl}|Array|HTMLCollection|*|null}
     */

  }, {
    key: 'getPaymentUrl',
    value: function getPaymentUrl() {
      return this.links && this.links.paymentUrl;
    }
  }]);
  return Payment;
}(Model);

Payment.STATUS_OPEN = 'open';
Payment.STATUS_PENDING = 'pending';
Payment.STATUS_CANCELLED = 'cancelled';
Payment.STATUS_EXPIRED = 'expired';
Payment.STATUS_PAID = 'paid';
Payment.STATUS_FAILED = 'failed';
Payment.RECURRINGTYPE_NONE = null;
Payment.RECURRINGTYPE_FIRST = 'first';
Payment.RECURRINGTYPE_RECURRING = 'recurring';

/**
 * The `payments` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */

var Payments = function (_Resource) {
  inherits(Payments, _Resource);

  function Payments() {
    classCallCheck(this, Payments);
    return possibleConstructorReturn(this, (Payments.__proto__ || Object.getPrototypeOf(Payments)).apply(this, arguments));
  }

  return Payments;
}(Resource);

Payments.resource = 'payments';
Payments.model = Payment;

/**
 * Payments base resource
 * @private
 */

var PaymentsResource = function (_Resource) {
  inherits(PaymentsResource, _Resource);

  function PaymentsResource() {
    classCallCheck(this, PaymentsResource);
    return possibleConstructorReturn(this, (PaymentsResource.__proto__ || Object.getPrototypeOf(PaymentsResource)).apply(this, arguments));
  }

  createClass(PaymentsResource, [{
    key: 'setParent',

    /**
     * Set the parent
     * @param {Object} params
     * @since 2.0.0
     */
    value: function setParent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!params.paymentId && !this.hasParentId()) {
        throw TypeError('Missing parameter "paymentId".');
      } else if (params.paymentId) {
        this.setParentId(params.paymentId);
      }
    }
  }]);
  return PaymentsResource;
}(Resource);

/**
 * The `Refund` model
 */

var Refund = function (_Model) {
  inherits(Refund, _Model);

  function Refund(props) {
    classCallCheck(this, Refund);

    var _this = possibleConstructorReturn(this, (Refund.__proto__ || Object.getPrototypeOf(Refund)).call(this, props));

    var defaults$$1 = {
      resource: 'refund',
      id: null,
      payment: null,
      amount: null,
      status: null,
      refundedDatetime: null
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  /**
   * If refund is pending
   * @returns {boolean}
   */


  createClass(Refund, [{
    key: 'isPending',
    value: function isPending() {
      return this.status === Refund.STATUS_PENDING;
    }

    /**
     * If refund is processing
     * @returns {boolean}
     */

  }, {
    key: 'isProcessing',
    value: function isProcessing() {
      return this.status === Refund.STATUS_PROCESSING;
    }

    /**
     * If refund is refunded
     * @returns {boolean}
     */

  }, {
    key: 'isRefunded',
    value: function isRefunded() {
      return !!this.refundedDatetime;
    }
  }]);
  return Refund;
}(Model);

Refund.STATUS_PENDING = 'pending';
Refund.STATUS_PROCESSING = 'processing';
Refund.STATUS_REFUNDED = 'refunded';

/**
 * The `payments_refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */

var PaymentsRefunds = function (_PaymentsResource) {
  inherits(PaymentsRefunds, _PaymentsResource);

  function PaymentsRefunds() {
    classCallCheck(this, PaymentsRefunds);
    return possibleConstructorReturn(this, (PaymentsRefunds.__proto__ || Object.getPrototypeOf(PaymentsRefunds)).apply(this, arguments));
  }

  createClass(PaymentsRefunds, [{
    key: 'create',


    /**
     * Create a payment refund
     * @param {Object} [data]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */
    value: function create(data, cb) {
      this.setParent(data);

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        data = omit(data, 'paymentId'); // eslint-disable-line no-param-reassign
      }

      return get(PaymentsRefunds.prototype.__proto__ || Object.getPrototypeOf(PaymentsRefunds.prototype), 'create', this).call(this, data, cb);
    }

    /**
     * Get a payment refund by ID
     * @param {number} id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */

  }, {
    key: 'get',
    value: function get$$1(id, params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'paymentId'); // eslint-disable-line no-param-reassign
      }

      return get(PaymentsRefunds.prototype.__proto__ || Object.getPrototypeOf(PaymentsRefunds.prototype), 'get', this).call(this, id, params, cb);
    }

    /**
     * Get all payment refunds
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */

  }, {
    key: 'all',
    value: function all(params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'paymentId'); // eslint-disable-line no-param-reassign
      }

      return get(PaymentsRefunds.prototype.__proto__ || Object.getPrototypeOf(PaymentsRefunds.prototype), 'all', this).call(this, params, cb);
    }

    /**
     * Delete a payment_refund by ID
     * @param {number} id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */

  }, {
    key: 'delete',
    value: function _delete(id, params, cb) {
      if (typeof params === 'function') {
        cb = params; // eslint-disable-line no-param-reassign
      }

      this.setParent(params);

      return get(PaymentsRefunds.prototype.__proto__ || Object.getPrototypeOf(PaymentsRefunds.prototype), 'delete', this).call(this, id, cb);
    }

    /**
     * Alias for delete
     * @since 1.3.2
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      return this.delete.apply(this, arguments);
    }
  }]);
  return PaymentsRefunds;
}(PaymentsResource);

PaymentsRefunds.resource = 'payments_refunds';
PaymentsRefunds.model = Refund;

/**
 * The `Method` model
 */

var Method = function (_Model) {
  inherits(Method, _Model);

  function Method(props) {
    classCallCheck(this, Method);

    var _this = possibleConstructorReturn(this, (Method.__proto__ || Object.getPrototypeOf(Method)).call(this, props));

    var defaults$$1 = {
      resource: 'method',
      id: null,
      description: null,
      amount: {
        minimum: null,
        maximum: null
      },
      image: {
        normal: null,
        bigger: null
      }
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  /**
   * Get minimum amount of payment method
   * @returns {Number}
   */


  createClass(Method, [{
    key: 'getMinimumAmount',
    value: function getMinimumAmount() {
      return parseFloat(this.amount && this.amount.minimum ? this.amount.minimum : '0');
    }

    /**
     * Get maximum amount of payment method
     * @returns {Number}
     */

  }, {
    key: 'getMaximumAmount',
    value: function getMaximumAmount() {
      return parseFloat(this.amount && this.amount.maximum ? this.amount.maximum : '0');
    }
  }]);
  return Method;
}(Model);

Method.IDEAL = 'ideal';
Method.CREDITCARD = 'creditcard';
Method.MISTERCASH = 'mistercash';
Method.SOFORT = 'sofort';
Method.BANKTRANSFER = 'banktransfer';
Method.DIRECTDEBIT = 'directdebit';
Method.BITCOIN = 'bitcoin';
Method.PAYPAL = 'paypal';
Method.BELFIUS = 'belfius';
Method.PAYSAFECARD = 'paysafecard';
Method.PODIUMCADEAUKAART = 'podiumcadeaukaart';
Method.KBC = 'kbc';

/**
 * The `methods` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */

var Methods = function (_Resource) {
  inherits(Methods, _Resource);

  function Methods() {
    classCallCheck(this, Methods);
    return possibleConstructorReturn(this, (Methods.__proto__ || Object.getPrototypeOf(Methods)).apply(this, arguments));
  }

  return Methods;
}(Resource);

Methods.resource = 'methods';
Methods.model = Method;

/**
 * The `Issuer` model
 */

var Issuer = function (_Model) {
  inherits(Issuer, _Model);

  function Issuer(props) {
    classCallCheck(this, Issuer);

    var _this = possibleConstructorReturn(this, (Issuer.__proto__ || Object.getPrototypeOf(Issuer)).call(this, props));

    var defaults$$1 = {
      resource: 'issuer',
      id: null,
      name: null,
      method: null
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  return Issuer;
}(Model);

/**
 * The `issuers` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.0.0
 */

var Issuers = function (_Resource) {
  inherits(Issuers, _Resource);

  function Issuers() {
    classCallCheck(this, Issuers);
    return possibleConstructorReturn(this, (Issuers.__proto__ || Object.getPrototypeOf(Issuers)).apply(this, arguments));
  }

  return Issuers;
}(Resource);

Issuers.resource = 'issuers';
Issuers.model = Issuer;

/**
 * The `refunds` resource
 * @static {string} resource
 * @static {Object} model
 * @since 2.0.0
 */

var Refunds = function (_Resource) {
  inherits(Refunds, _Resource);

  function Refunds() {
    classCallCheck(this, Refunds);
    return possibleConstructorReturn(this, (Refunds.__proto__ || Object.getPrototypeOf(Refunds)).apply(this, arguments));
  }

  return Refunds;
}(Resource);

Refunds.resource = 'refunds';
Refunds.model = Refund;

/**
 * The `Customer` model
 */

var Customer = function (_Model) {
  inherits(Customer, _Model);

  function Customer(props) {
    classCallCheck(this, Customer);

    var _this = possibleConstructorReturn(this, (Customer.__proto__ || Object.getPrototypeOf(Customer)).call(this, props));

    var defaults$$1 = {
      resource: 'customer',
      id: null,
      name: null,
      email: null,
      locale: null,
      metadata: null,
      recentlyUsedMethods: null,
      createdDatetime: null
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  return Customer;
}(Model);

/**
 * The `customers` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */

var Customers = function (_Resource) {
  inherits(Customers, _Resource);

  function Customers() {
    classCallCheck(this, Customers);
    return possibleConstructorReturn(this, (Customers.__proto__ || Object.getPrototypeOf(Customers)).apply(this, arguments));
  }

  return Customers;
}(Resource);

Customers.resource = 'customers';
Customers.model = Customer;

/**
 * Customers base resource
 * @private
 */

var CustomersResource = function (_Resource) {
  inherits(CustomersResource, _Resource);

  function CustomersResource() {
    classCallCheck(this, CustomersResource);
    return possibleConstructorReturn(this, (CustomersResource.__proto__ || Object.getPrototypeOf(CustomersResource)).apply(this, arguments));
  }

  createClass(CustomersResource, [{
    key: 'setParent',

    /**
     * Set the parent
     * @param {Object} params
     * @since 2.0.0
     */
    value: function setParent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!params.customerId && !this.hasParentId()) {
        throw TypeError('Missing parameter "customerId".');
      } else if (params.customerId) {
        this.setParentId(params.customerId);
      }
    }
  }]);
  return CustomersResource;
}(Resource);

/**
 * The `customers_payments` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.1.1
 */

var CustomersPayments = function (_CustomersResource) {
  inherits(CustomersPayments, _CustomersResource);

  function CustomersPayments() {
    classCallCheck(this, CustomersPayments);
    return possibleConstructorReturn(this, (CustomersPayments.__proto__ || Object.getPrototypeOf(CustomersPayments)).apply(this, arguments));
  }

  createClass(CustomersPayments, [{
    key: 'create',


    /**
     * Create a customer payment
     * @param {Object} [data]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */
    value: function create(data, cb) {
      this.setParent(data);

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        data = omit(data, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersPayments.prototype.__proto__ || Object.getPrototypeOf(CustomersPayments.prototype), 'create', this).call(this, data, cb);
    }

    /**
     * Get a customer payment
     * @param {number} id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */

  }, {
    key: 'get',
    value: function get$$1(id, params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersPayments.prototype.__proto__ || Object.getPrototypeOf(CustomersPayments.prototype), 'get', this).call(this, id, params, cb);
    }

    /**
     * Get all of a customer's payments
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.1.1
     */

  }, {
    key: 'all',
    value: function all(params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersPayments.prototype.__proto__ || Object.getPrototypeOf(CustomersPayments.prototype), 'all', this).call(this, params, cb);
    }
  }]);
  return CustomersPayments;
}(CustomersResource);

CustomersPayments.resource = 'customers_payments';
CustomersPayments.model = Payment;

/**
 * The `Mandate` model
 */

var Mandate = function (_Model) {
  inherits(Mandate, _Model);

  function Mandate(props) {
    classCallCheck(this, Mandate);

    var _this = possibleConstructorReturn(this, (Mandate.__proto__ || Object.getPrototypeOf(Mandate)).call(this, props));

    var defaults$$1 = {
      resource: 'mandate',
      id: null,
      status: null,
      method: null,
      customerId: null,
      details: null,
      createdDatetime: null
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  /**
   * If the mandate is valid
   * @returns {boolean}
   */


  createClass(Mandate, [{
    key: 'isValid',
    value: function isValid() {
      return this.status === Mandate.STATUS_VALID;
    }
  }]);
  return Mandate;
}(Model);

Mandate.STATUS_VALID = 'valid';
Mandate.STATUS_INVALID = 'invalid';

/**
 * The `customers_mandates` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.2.0
 */

var CustomersMandates = function (_CustomersResource) {
  inherits(CustomersMandates, _CustomersResource);

  function CustomersMandates() {
    classCallCheck(this, CustomersMandates);
    return possibleConstructorReturn(this, (CustomersMandates.__proto__ || Object.getPrototypeOf(CustomersMandates)).apply(this, arguments));
  }

  createClass(CustomersMandates, [{
    key: 'create',


    /**
     * Create a customer mandate
     * @param {Object} [data]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.2.0
     */
    value: function create(data, cb) {
      this.setParent(data);

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        data = omit(data, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersMandates.prototype.__proto__ || Object.getPrototypeOf(CustomersMandates.prototype), 'create', this).call(this, data, cb);
    }

    /**
     * Get a customer mandate by ID
     * @param id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.2.0
     */

  }, {
    key: 'get',
    value: function get$$1(id, params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersMandates.prototype.__proto__ || Object.getPrototypeOf(CustomersMandates.prototype), 'get', this).call(this, id, params, cb);
    }

    /**
     * Get all of a customer's mandates
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.2.0
     */

  }, {
    key: 'all',
    value: function all(params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersMandates.prototype.__proto__ || Object.getPrototypeOf(CustomersMandates.prototype), 'all', this).call(this, params, cb);
    }

    /**
     * Delete a customer subscription
     * @param id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 2.0.0
     */

  }, {
    key: 'delete',
    value: function _delete(id, params, cb) {
      if (typeof params === 'function') {
        cb = params; // eslint-disable-line no-param-reassign
      }

      this.setParent(params);
      return get(CustomersMandates.prototype.__proto__ || Object.getPrototypeOf(CustomersMandates.prototype), 'delete', this).call(this, id, cb);
    }

    /**
     * Alias for delete
     * @since 1.3.2
     */

  }, {
    key: 'cancel',
    value: function cancel() {
      return this.delete.apply(this, arguments);
    }

    /**
     * Alias of delete
     * @since 2.0.0
     */

  }, {
    key: 'revoke',
    value: function revoke() {
      return this.delete.apply(this, arguments);
    }
  }]);
  return CustomersMandates;
}(CustomersResource);

CustomersMandates.resource = 'customers_mandates';
CustomersMandates.model = Mandate;

/**
 * The `Subscription` model
 */

var Subscription = function (_Model) {
  inherits(Subscription, _Model);

  function Subscription(props) {
    classCallCheck(this, Subscription);

    var _this = possibleConstructorReturn(this, (Subscription.__proto__ || Object.getPrototypeOf(Subscription)).call(this, props));

    var defaults$$1 = {
      resource: 'subscription',
      id: null,
      customerId: null,
      mode: null,
      createdDatetime: null,
      status: null,
      amount: null,
      times: null,
      interval: null,
      description: null,
      method: null,
      cancelledDatetime: null,
      links: {
        webhookUrl: null
      }
    };

    Object.assign(_this, defaults$$1, props);
    return _this;
  }

  /**
   * Get the webhook url
   * @returns {boolean|string}
   */
  // Active, but mandate became invalid.
  // Waiting for a valid mandate.


  createClass(Subscription, [{
    key: 'getWebhookUrl',
    value: function getWebhookUrl() {
      return this.links && this.links.webhookUrl;
    }

    /**
     * If the subscription is active
     * @returns {boolean}
     */

  }, {
    key: 'isActive',
    value: function isActive() {
      return this.status === Subscription.STATUS_ACTIVE;
    }

    /**
     * If the subscription is pending
     * @returns {boolean}
     */

  }, {
    key: 'isPending',
    value: function isPending() {
      return this.status === Subscription.STATUS_PENDING;
    }

    /**
     * If the subscription is completed
     * @returns {boolean}
     */

  }, {
    key: 'isCompleted',
    value: function isCompleted() {
      return this.status === Subscription.STATUS_COMPLETED;
    }

    /**
     * If the subscription is suspended
     * @returns {boolean}
     */

  }, {
    key: 'isSuspended',
    value: function isSuspended() {
      return this.status === Subscription.STATUS_SUSPENDED;
    }

    /**
     * If the subscription is cancelled
     * @returns {boolean}
     */

  }, {
    key: 'isCanceled',
    value: function isCanceled() {
      return !!this.cancelledDatetime;
    }
  }]);
  return Subscription;
}(Model);

Subscription.STATUS_ACTIVE = 'active';
Subscription.STATUS_PENDING = 'pending';
Subscription.STATUS_CANCELLED = 'cancelled';
Subscription.STATUS_SUSPENDED = 'suspended';
Subscription.STATUS_COMPLETED = 'completed';

/**
 * The `customers_subscriptions` resource
 * @static {string} resource
 * @static {Object} model
 * @since 1.3.2
 */

var CustomersSubscriptions = function (_CustomersResource) {
  inherits(CustomersSubscriptions, _CustomersResource);

  function CustomersSubscriptions() {
    classCallCheck(this, CustomersSubscriptions);
    return possibleConstructorReturn(this, (CustomersSubscriptions.__proto__ || Object.getPrototypeOf(CustomersSubscriptions)).apply(this, arguments));
  }

  createClass(CustomersSubscriptions, [{
    key: 'create',


    /**
     * Create a customer subscription
     * @param {Object} [data]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.3.2
     */
    value: function create(data, cb) {
      this.setParent(data);

      if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
        data = omit(data, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersSubscriptions.prototype.__proto__ || Object.getPrototypeOf(CustomersSubscriptions.prototype), 'create', this).call(this, data, cb);
    }

    /**
     * Get a customer subscription
     * @param id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.3.2
     */

  }, {
    key: 'get',
    value: function get$$1(id, params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersSubscriptions.prototype.__proto__ || Object.getPrototypeOf(CustomersSubscriptions.prototype), 'get', this).call(this, id, params, cb);
    }

    /**
     * Get all customer's subscriptions
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.3.2
     */

  }, {
    key: 'all',
    value: function all(params, cb) {
      this.setParent(params);

      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
        params = omit(params, 'customerId'); // eslint-disable-line no-param-reassign
      }

      return get(CustomersSubscriptions.prototype.__proto__ || Object.getPrototypeOf(CustomersSubscriptions.prototype), 'all', this).call(this, params, cb);
    }

    /**
     * Delete a customer subscription
     * @param id
     * @param {Object} [params]
     * @param {function} [cb]
     * @returns {Promise.<T>}
     * @since 1.3.2
     */

  }, {
    key: 'delete',
    value: function _delete(id, params, cb) {
      if (typeof params === 'function') {
        cb = params; // eslint-disable-line no-param-reassign
      }

      this.setParent(params);
      return get(CustomersSubscriptions.prototype.__proto__ || Object.getPrototypeOf(CustomersSubscriptions.prototype), 'delete', this).call(this, id, cb);
    }

    /**
     * Alias for delete
     * @since 1.3.2
     */

  }, {
    key: 'cancel',
    value: function cancel(id, params, cb) {
      return this.delete(id, params, cb);
    }
  }]);
  return CustomersSubscriptions;
}(CustomersResource);

CustomersSubscriptions.resource = 'customers_subscriptions';
CustomersSubscriptions.model = Subscription;

/**
 * Create Mollie API
 * @param {Object} httpClient
 * @returns {Object} available resources
 * @since 2.0.0
 */
function createMollieApi(_ref) {
  var httpClient = _ref.httpClient;

  return {
    payments: new Payments(httpClient),
    payments_refunds: new PaymentsRefunds(httpClient),
    methods: new Methods(httpClient),
    issuers: new Issuers(httpClient),
    refunds: new Refunds(httpClient),
    customers: new Customers(httpClient),
    customers_payments: new CustomersPayments(httpClient),
    customers_mandates: new CustomersMandates(httpClient),
    customers_subscriptions: new CustomersSubscriptions(httpClient)
  };
}

var cert = "dc70e60c16aaac11.pem";

var version = "2.0.0-alpha.1";

/**
 * Create Mollie client.
 * @param httpVendor
 * @param options
 * @returns {Object} available resources
 * @since 2.0.0
 */
function mollie(httpVendor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!options.apiKey) {
    throw new TypeError('Missing parameter "apiKey".');
  }

  options.defaultHostname = 'api.mollie.com';
  options.headers = assign(options.headers, {
    Authorization: 'Bearer ' + options.apiKey,
    'Content-Type': 'application/vnd.mollie.api.v1+json',
    'X-Mollie-User-Agent': 'mollie.js/' + version
  });
  options.httpsAgent = new https.Agent({
    cert: fs.readFileSync(path.resolve(__dirname, cert))
  });

  var httpClient = createHttpClient(httpVendor, options);

  return createMollieApi({ httpClient: httpClient });
}

/**
 * Create a new Mollie client with the default http vendor.
 * @param params
 * @returns {Object}
 */
function createClient(params) {
  return mollie(axios, params);
}

/**
 * Create a new mollie client with a custom http vendor.
 * Note: If you want to use a different vendor than axios, make sure it uses promises!
 * @param httpVendor
 * @param params
 * @returns {Object}
 */
function createClientWithCustomHttpVendor(httpVendor, params) {
  return mollie(httpVendor, params);
}

var index = {
  createClient: createClient,
  createClientWithCustomHttpVendor: createClientWithCustomHttpVendor
};

exports.createClient = createClient;
exports.createClientWithCustomHttpVendor = createClientWithCustomHttpVendor;
exports['default'] = index;
