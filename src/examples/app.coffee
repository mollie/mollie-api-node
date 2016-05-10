http = require("http");
url = require("url");
fs = require("fs");

###
  Example app.
###
app = http.createServer((request, response) ->
	path = url.parse(request.url).pathname

	###
	  Load requested example.
	###
	try
		example = require("." + path);
		new example(request, response);
	catch error
		console.error(error);
		response.writeHead(200, "Content-Type": "text/html; charset=utf-8");
		response.write('<a href="./1-new-payment">Try example 1</a><br>');
		response.write('<a href="./4-ideal-payment">Try example 4</a><br>');
		response.write('<a href="./5-payments-history">Try example 5</a><br>');
		response.write('<a href="./6-list-available-methods">Try example 6</a><br>');
		response.write('<a href="./07-refund-payment">Try example 7</a><br>');
		response.write('<a href="./11-new-customer">Try example 11</a><br>');
		response.write('<a href="./12-new-customer-payment">Try example 12</a><br>');
		response.write('<a href="./13-customer-payments-history">Try example 13</a><br>');
		response.write('<a href="./14-recurring-first-payment">Try example 14</a><br>');
		response.write('<a href="./15-recurring-payment">Try example 15</a><br>');
		response.end();
);

app.listen(8888);
console.log("==> http://localhost:8888");
