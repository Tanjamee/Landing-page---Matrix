exports.handler = async (event) => {
  console.log("✅ Function triggered!");
  console.log("📡 Method:", event.httpMethod);
  console.log("🧾 Raw body:", event.body);

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    console.log("📬 Received email:", data.email);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Thanks for signing up!" }),
    };
  } catch (err) {
    console.error("❌ Error parsing body:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" }),
    };
  }
};
