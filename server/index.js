const http = require("http");
const mailer = require("./mailer");
require("dotenv").config();

const port = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  if (req.url === "/formdata" && req.method === "POST") {
    res.writeHead(200, {
      "Content-Type": "text/html",
      "Access-Control-Allow-Origin": "*",
    });
    var data = "";
    await req.on("data", (chunk) => {
      data = chunk.toString();
    });

    console.log(data);

    mailer.sendMail(data, (error, response) => {
      if (error) {
        console.log("Unable to send Mail", error);
        res.end({ error: error });
      } else {
        console.log(response);
        res.end(JSON.stringify({ response: response }));
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Running on ${port}`);
});
