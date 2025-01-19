// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("apiForm");
    const responseData = document.getElementById("responseData");
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form submission
  
      // Get form values
      const endpoint = document.getElementById("endpoint").value;
      const method = document.getElementById("method").value;
      const headersInput = document.getElementById("headers").value;
      const bodyInput = document.getElementById("body").value;
  
      let headers = {};
      let body = null;
  
      // Parse headers and body
      try {
        if (headersInput) {
          headers = JSON.parse(headersInput);
        }
        if (bodyInput) {
          body = JSON.parse(bodyInput);
        }
      } catch (error) {
        responseData.textContent = "Invalid JSON in headers or body.";
        return;
      }
  
      // Ensure Content-Type header is set for GraphQL or JSON requests
      if (method === "POST" || method === "PUT") {
        headers["Content-Type"] = "application/json";
      }
  
      // Prepare the request options
      const options = {
        method,
        headers,
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
  
      // Send the API request
      try {
        const response = await fetch(endpoint, options);
  
        // Check for HTTP errors
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
        }
  
        // Parse JSON response
        const data = await response.json();
        responseData.textContent = JSON.stringify(data, null, 2);
      } catch (error) {
        // Handle errors (e.g., network issues, invalid endpoint)
        responseData.textContent = `Error: ${error.message}`;
      }
    });
  });
  