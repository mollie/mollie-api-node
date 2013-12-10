http = require "http"
url = require "url"
fs = require "fs"

###
  Example app.
###
app = http.createServer (request, response) ->
  path = url.parse(request.url).pathname

  ###
    Load requested example.
  ###
  try
    example = require ".#{path}"
    new example request, response
  catch error
    console.error error
    response.writeHead 200, "Content-Type": "text/html; charset=utf-8"
    response.write '<a href="./1-new-payment">Try example 1</a><br>'
    response.write '<a href="./4-ideal-payment">Try example 4</a>'
    response.end()

app.listen 8888
