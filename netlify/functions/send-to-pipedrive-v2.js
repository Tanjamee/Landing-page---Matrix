const fetch = require("node-fetch");

exports.handler = async (event) => {
  console.log("✅ Function triggered!");

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const { email } = JSON.parse(event.body);
    console.log("📬 Received email:", email);

    const apiToken = process.env.PIPEDRIVE_API; // Get API token from Netlify environment variable
    const endpoint = `https://api.pipedrive.com/v1/persons?api_token=${apiToken}`;

    const personData = {
      name: email.split("@")[0], // Take the part before @ as name
      email: [{ value: email, primary: true }],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(personData),
    });

    const result = await response.json();
    console.log("📬 Pipedrive API response:", result);

    if (result.success) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Successfully signed up!" }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Failed to signed up!" }),
      };
    }

  } catch (error) {
    console.error("❌ Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};
