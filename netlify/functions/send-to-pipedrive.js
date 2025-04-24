const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  const apiToken = "44d5333dc6088464f50f5fa5843cbcb245387712";
  const endpoint = `https://api.pipedrive.com/v1/persons?api_token=${apiToken}`;

  const body = {
    name: email.split("@")[0],
    email: email
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  const result = await response.json();

  if (result.success) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Person added to Pipedrive" })
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to add person" })
    };
  }
};
