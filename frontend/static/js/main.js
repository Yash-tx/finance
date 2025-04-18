// Only add event listeners if the elements exist
const stockForm = document.getElementById("stockForm");
if (stockForm) {
    stockForm.addEventListener("submit", async function(event) {
        event.preventDefault();
        const symbol = document.getElementById("symbol").value;
        const resultDiv = document.getElementById("result");
        
        try {
            resultDiv.style.display = "block";
            resultDiv.textContent = "Loading...";
            
            const response = await fetch(`/stock/${symbol}`);
            const data = await response.json();
            
            if (response.ok) {
                resultDiv.className = "alert alert-success";
                resultDiv.textContent = `Current price of ${symbol.toUpperCase()}: $${data.price.toFixed(2)}`;
            } else {
                resultDiv.className = "alert alert-danger";
                resultDiv.textContent = data.detail || "Error fetching stock price";
            }
        } catch (error) {
            resultDiv.className = "alert alert-danger";
            resultDiv.textContent = "Error connecting to server";
        }
    });
}

// Chat functionality
const sendButton = document.getElementById("send");
if (sendButton) {
    sendButton.addEventListener("click", async function() {
        const query = document.getElementById("query").value;
        const chatLog = document.getElementById("chatLog");
        
        if (!query.trim()) return;  // Don't send empty messages
        
        try {
            // Add user message immediately
            chatLog.innerHTML += `<div class="message user-message">User: ${query}</div>`;
            
            // Show loading state
            const loadingDiv = document.createElement("div");
            loadingDiv.className = "message ai-message";
            loadingDiv.textContent = "AI is thinking...";
            chatLog.appendChild(loadingDiv);
            
            const response = await fetch(`/chat/${query}`);
            const data = await response.json();
            
            // Replace loading message with AI response
            if (response.ok) {
                loadingDiv.innerHTML = `AI: ${data.response}`;
            } else {
                loadingDiv.innerHTML = `Error: ${data.detail || "Failed to get response"}`;
                loadingDiv.className = "message error-message";
            }
            
            // Clear input field
            document.getElementById("query").value = "";
            
            // Scroll to bottom
            chatLog.scrollTop = chatLog.scrollHeight;
        } catch (error) {
            chatLog.innerHTML += `<div class="message error-message">Error: Could not connect to server</div>`;
        }
    });
}
