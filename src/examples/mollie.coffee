Mollie = require("../lib/mollie");

###
	Initialize the Mollie API library with your API key.
	See: https://www.mollie.com/beheer/account/profielen/
###
mollie = new Mollie.API.Client();
mollie.setApiKey("test_b93kfaAsnngIAT3NysojhYvKEJ5YbP");

module.exports = mollie;
