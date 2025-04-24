exports.handler = async (event) => {
  console.log("✅ Function triggered!");

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.error("❌ Failed to parse JSON:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid JSON" }),
    };
  }

  console.log("📬 Received email:", data.email);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Thanks for submitting!" }),
  };
};
