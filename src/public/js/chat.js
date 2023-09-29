const socket = io();

let sendMsgBtn = document.getElementById("send-message-btn")
let messageInput = document.getElementById("message-input")

let user = ""

// Identificacion de usuario

Swal.fire({
    title: "Identifícate con tu email",
    input: "email",
    inputValidator: (value) => {
        if (!value) {
        return "Necesitas escribir un email para identificarte" // Devuelvo el mensaje de error
        }
        return false // Se identifico con exito
    },
    allowOutsideClick: false,
    }).then((result) => {
    user = result.value;
});

// Socket.on

socket.on("update-messages", (messages) => {
    let chatContainer = document.getElementById("chat-container")
    chatContainer.innerHTML = ""

    for (message of messages) {
        let messageElement = document.createElement("p")
        messageElement.innerHTML = `${message.user}: ${message.message}`

        chatContainer.appendChild(messageElement)
    }
})

// Event listeners

messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMsgBtn.click(); // Al apretar enter, se esta realizando un "click" sobre ese boton
    }
})

sendMsgBtn.addEventListener('click', () => {
    socket.emit("new-message", {user: user, message: messageInput.value})
    messageInput.value = ""
})