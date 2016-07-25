function errorStatusCodes(statusCode) {
  switch (statusCode) {
    case 21000:
      return { status: 21000, message: "The App Store could not read the JSON object you provided." }
      break;
    case 21002:
      return { status: 21002, message: "The data in the receipt-data property was malformed or missing." }
      break;
    case 21003:
      return { status: 21003, message: "The receipt could not be authenticated." }
      break;
    case 21004:
      return { status: 21004, message: "The shared secret you provided does not match the shared secret on file for your account." }
      break;
    case 21005:
      return { status: 21005, message: "The receipt server is not currently available." }
      break;
    case 21006:
      return { status: 21006, message: "This receipt is valid but the subscription has expired. When this status code is returned to your server, the receipt data is also decoded and returned as part of the response." }
      break;
    case 21007:
      return { status: 21007, message: "This receipt is from the test environment, but it was sent to the production environment for verification. Send it to the test environment instead." }
      break;
    case 21008:
      return { status: 21008, message: "This receipt is from the production environment, but it was sent to the test environment for verification. Send it to the production environment instead." }
      break;
    case default:
      return { status: -1, message: "Unknown error" };
  }
};

export default function(password, production = true) {
  const endpoint = production ? 'buy.itunes.apple.com' : 'sandbox.itunes.apple.com';
  const url = `https://${endpoint}/verifyReceipt`;

  return (receipt, callback) => {
    const payload = {
      'receipt-data': receipt,
      password,
    };

    const options = {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch(url, options)
      .then((response) =>
        var error;
        if(response.status !== 0) {
          error = errorStatusCodes(response.status);
        }
        callback(error, response.json());
  }
}

