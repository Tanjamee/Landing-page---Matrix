const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);
  const apiToken = process.env.PIPEDRIVE_API;

  const response = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiToken}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: email.split("@")[0], email })
  });

  const result = await response.json();

  return {
    statusCode: result.success ? 200 : 500,
    body: JSON.stringify(result)
  };
};
