export async function handler(event, context) {
    console.log("moaz Logging server-side info",event, context);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Logged" }),
    };
  }
  