exports.handler = async (event) => {
  console.log("✅ Function triggered!");

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Hello from Netlify!" }),
  };
};
