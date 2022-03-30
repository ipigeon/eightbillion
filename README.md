# eightbillion
Real-time data sonification web app of the world population counter prior to reaching 8b people. 
edit

#### setup nodejs server

1. goto project directory /eightbillion
2. install node modules:
    $ npm install cheerio request express
    this will create the node_modules directory
3. set port on server.js, default is 9104:
    line 21:    var PORT = process.env.PORT || 9104;
4. save the file.
5. run the server
    $ node server.js

The server is now listening to server html on port 9104

Open browser to [http://localhost:9104](http://localhost:9104)
