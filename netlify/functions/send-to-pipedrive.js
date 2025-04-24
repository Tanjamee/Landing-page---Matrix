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
const fetch = require("node-fetch");

exports.handler = async (event) => {
  try {
    const { email } = JSON.parse(event.body);
    console.log("Received email:", email); // 🟢 ADD THIS

    const apiToken = process.env.PIPEDRIVE_API;
    const endpoint = `https://api.pipedrive.com/v1/persons?api_token=${apiToken}`;
    
    const body = {
      name: email.split("@")[0],
      email: email
    };

    console.log("Sending request to:", endpoint); // 🟢 ADD THIS

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const result = await response.json();
    console.log("Pipedrive response:", result); // 🟢 ADD THIS

    return {
      statusCode: result.success ? 200 : 500,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error("Error in function:", error); // 🛑 Log errors
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Something went wrong." })
    };
  }
};
