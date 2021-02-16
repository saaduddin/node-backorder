const functions = require("firebase-functions");
const fetch = require("node-fetch");

const params = {
    key: "your-api-key",
    domain: "domain-you-want",
    duration: 1, //duration in years you want it registered for
    currency: "USD"
};

const backorderFunction = () => fetch(`https://api.dynadot.com/api2.html?key=${params.key}&command=register&domain=${params.domain}&duration=${params.duration}&currency=${params.currency}`)
    .then(res => res.text())
    .then(text => console.log(text));

exports.domainBackorder = functions
    .runWith({ timeoutSeconds: 300, memory: "256MB" })
    .pubsub.schedule("every 5 minutes")
    .onRun(async (context) => {
        backorderFunction();
    });