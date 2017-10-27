var http = require('http'); // include the built-in http module
var url = require('url');
var dt = require('./myfirstmodule'); // include the module in a file in same directory as program

// create a server object
//   req is request object from client, is type http.IncomingMessage object
//   res is response object
http.createServer(function (req, res) {
	// response header: 200 = response code 'okay', {...} is response to display content as HTML 
    res.writeHead(200, {'Content-Type': 'text/html'}); 
    
    // write a response
    res.write("The date and time are currently: " + dt.myDateTime());
    res.write("<br>");
    res.write("request url is " + req.url);
    res.write("<br>");

    // url.parse: parse the url.  return an object of pre-defined segments (i.e. host, path, search, etc)
    // query: parse the the search string (follows "?") and return a hash(?) of the elements
    var q = url.parse(req.url, true).query;
    var txt = "part 1 is " + q.part1 + ", part 2 is " + q.part2;
    res.write(txt);
    res.write("<br>");

     // end the response
    res.end("*** end of page ***");
}).listen(8080);