var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", process.env.MIDTRANS_SERVER_KEY);

var raw = "\n\n";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://api.sandbox.midtrans.com/v2/SANDBOX-G710367688-806/status", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


class Controller {

    static async charge(req, res, next) {

    }

    static async snapCheckout(req, res, next) {
        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : process.env.MIDTRANS_SERVER_KEY,
            clientKey : process.env.MIDTRANS_CLIENT_KEY
          });
    }

    static async checkTransaction(req, res, next) {

    }
}

module.exports = Controller;