let http = require("http");
let url = require("url");
let ejs = require("ejs");
const { parse } = require("querystring");
const fs = require("fs");
let tabStudent = [];



http.createServer(function (req, res) {
    let page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200);

    if (page == "/") {
      ejs.renderFile(
        "views/index.ejs",
        { user: tabStudent } ,
        function (err, str) {
          res.write(str);
        }
      );
    }

    if (req.method === 'POST') {
      let body = "";
    req.on("data", (chunk) => {
        body += chunk.toString();
        console.log(body);
      });

      req.on("end", () => {
        let lol = parse(body);

        if (lol.buttonName) {
            tabStudent.push( {

             name: lol.buttonName,
                veille: null
            });
        }
       
    
            if (lol.buttonVeille) {
             
                    let randomStudent = tabStudent[Math.floor(Math.random() * tabStudent.length)];
                    randomStudent.veille =  lol.buttonVeille;
                    console.log("index");
                    console.log(randomStudent);

            }

    
        let result = JSON.stringify(tabStudent);

        fs.writeFile("api.json", result, (err) => { 
            if (err) 
              console.log(err); 
            else { 
              console.log("File written successfully\n"); 
              console.log("The written has the following contents:"); 
              console.log(fs.readFileSync("api.json", "utf8")); 
            } 
          });
      });
      res.end();
    }

console.log('PAGE');

console.log(page);
    if (req.url == "/Students") {
        console.log('lol');
        res.writeHead(302, {'Location':'"/"' })
        return res.end();
    };

  

    if (req.method === 'POST' && page == "/Veille") {
        console.log("slt");
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        let lol = parse(body);
        tabStudent.push(lol.buttonVeille);
        console.log(tabVeille);
        JSON.stringify(tabVeille);
      });
      res.end();
    }

    if (page == "/Veille") {
        res.writeHead(302, {'Location':'"/"' 

        });
    }

}).listen(1337);
