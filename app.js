const express = require('express');

const bodyParser = require('body-parser');
const mail = require("./mail");

const app = express ();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });

app.post("/svp", (request, response) => {
    if (request.body.adresse)
        response.redirect(request.headers.origin + "/form-erreur");
    else{
        mail.send(request)
        response.redirect(request.headers.origin + "/form-succes");
    }
});

app.post("/test", (request, response) => {
    if (request.body.adresse)
        response.redirect(request.headers.origin + "/form-erreur");
    else{
        mail.send(request)
        response.redirect(request.headers.origin + "/form-succes");
    }
});
