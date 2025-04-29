const fetch = require("node-fetch");
const nodemailer = require("nodemailer");

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

    const apiToken = process.env.PIPEDRIVE_API;
    const pipelineId = process.env.PIPELINE_ID; // Your pipeline ID from Pipedrive
    const stageId = process.env.STAGE_ID;       // Your stage ID from Pipedrive
    const gmailUser = process.env.GMAIL_USER;   // Your Gmail address
    const gmailPass = process.env.GMAIL_PASS;   // Your Gmail app password

    // Step 1: Create the Person
    const personRes = await fetch(`https://api.pipedrive.com/v1/persons?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: email.split('@')[0],
        email: [{ value: email, primary: true }],
        label: "Landing Page Lead"
      }),
    });

    const personData = await personRes.json();
    if (!personData.success) {
      throw new Error("Failed to create Person in Pipedrive");
    }

    console.log("👤 Person created:", personData.data.id);

    // Step 2: Create the Deal
    const dealRes = await fetch(`https://api.pipedrive.com/v1/deals?api_token=${apiToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: `Lead from ${email}`,
        person_id: personData.data.id,
        pipeline_id: pipelineId,
        stage_id: stageId
      }),
    });

    const dealData = await dealRes.json();
    if (!dealData.success) {
      throw new Error("Failed to create Deal in Pipedrive");
    }

    console.log("💼 Deal created:", dealData.data.id);

    // Step 3: Send a confirmation email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: gmailUser,
      to: email,
      subject: "Thanks for signing up!",
      text: "Hi there! Thanks for signing up for our Matrix decision tool. We will be in touch soon!",
    });

    console.log("📧 Confirmation email sent to:", email);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Signup completed successfully!" }),
    };

  } catch (error) {
    console.error("❌ Error occurred:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error" }),
    };
  }
};
