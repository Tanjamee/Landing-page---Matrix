exports.handler = async (event) => {
  console.log("✅ Function triggered!"); // This MUST appear in the logs

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" }),
  };
};
