exports.handler = async (event) => {
  console.log("✅ Function triggered!");
  console.log("Method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  let data;
  try {
    data = JSON.parse(event.body);
    console.log("📬 Received email:", data.email); // 🔥 This should now show
  } catch (err) {
    console.error("❌ Error parsing body:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request body" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Thanks for signing up!" }),
  };
};
