const sentChatBtn = document.querySelector("#send-btn");
const chatInput = document.querySelector(".chat-input textarea");
const chatbox = document.querySelector(".chatbox");

let userMessage;

const createChatLi = (message, classname) => {
  const li = document.createElement("li");
  li.classList.add("chat", classname);
  let chatContent =
    classname === "outgoing"
      ? `<p>${message}</p>`
      : `<span class="material-symbols-outlined">support_agent</span><p>${message}</p>`;
  li.innerHTML = chatContent;
  return li;
};

const generateResponse = (incomingChatLi) => {
  const messageElement = incomingChatLi.querySelector("p");
  const userMessageLower = userMessage.toLowerCase();

  let response = "Xin lỗi, tôi không hiểu. Bạn có thể hỏi khác không?";
  if (userMessageLower.includes("cho tôi 1 đôi giày adidas đẹp nhất")) {
    response =
      "Chúng tôi có nhiều mẫu giày Adidas đẹp. Bạn muốn biết giá hoặc kích cỡ nào?";
  } else if (userMessageLower.includes("kích cỡ")) {
    response =
      "Vui lòng cho tôi biết kích cỡ giày bạn cần để tôi hỗ trợ tốt hơn.";
  } else if (userMessageLower.includes("size 42")) {
    response =
      "Chúng tôi có giày Adidas UltraBoost size 42 với giá 3.500.000 VNĐ. Bạn có cần thêm thông tin?";
  } else if (userMessageLower.includes("thanh toán tại quầy")) {
    response =
      "Bạn có thể thanh toán bằng tiền mặt hoặc thẻ tín dụng tại cửa hàng. Cần thêm thông tin gì không?";
  } else if (userMessageLower.includes("thanh toán online")) {
    response =
      "Khi thanh toán online, bạn có thể sử dụng thẻ tín dụng hoặc ví điện tử. Cần hướng dẫn thêm không?";
  } else if (userMessageLower.includes("thời gian giao hàng")) {
    response =
      "Thời gian giao hàng là từ 3 đến 5 ngày làm việc. Bạn có muốn biết thêm thông tin?";
  } else if (userMessageLower.includes("chính sách đổi trả")) {
    response =
      "Chúng tôi có chính sách đổi trả trong vòng 30 ngày. Cần thông tin chi tiết hơn không?";
  } else if (userMessageLower.includes("chốt đơn")) {
    response =
      "Cảm ơn quý khách! Đơn hàng đã được chốt. Chúng tôi sẽ liên hệ sớm.";
  }
  incomingChatLi.querySelector("span").className = "material-symbols-outlined";
  incomingChatLi.querySelector("span").textContent = "support_agent"; // Thay đổi icon

  messageElement.textContent = response;
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  console.log(userMessage);
  if (!userMessage) return;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));

  const incomingChatLi = createChatLi("Thinking...", "incoming");
  chatbox.appendChild(incomingChatLi);

  setTimeout(() => {
    generateResponse(incomingChatLi);
  }, 600);

  chatInput.value = "";
  sentChatBtn.style.display = "none";
};

// Hiển thị nút gửi khi có nội dung trong textarea
chatInput.addEventListener("input", () => {
  if (chatInput.value.trim() !== "") {
    sentChatBtn.style.display = "block";
  } else {
    sentChatBtn.style.display = "none";
  }
});

// Sự kiện nhấn Enter trong textarea
chatInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    handleChat();
  }
});

// Điều khiển ẩn hiện giao diện chat
document.addEventListener("DOMContentLoaded", () => {
  const toggleChatBtn = document.getElementById("toggle-chat");
  const chatBot = document.getElementById("chatbot");
  const showIcon = document.getElementById("show-icon");
  const hideIcon = document.getElementById("hide-icon");
  const closeChatBtn = document.getElementById("close-chat");

  toggleChatBtn.addEventListener("click", () => {
    if (chatBot.style.display === "none" || chatBot.style.display === "") {
      chatBot.style.display = "block"; // Hiện chat
      showIcon.style.display = "none"; // Ẩn icon tin nhắn
      hideIcon.style.display = "block"; // Hiện icon đóng
    } else {
      chatBot.style.display = "none"; // Ẩn chat
      showIcon.style.display = "block"; // Hiện icon tin nhắn
      hideIcon.style.display = "none"; // Ẩn icon đóng
    }
  });

  closeChatBtn.addEventListener("click", () => {
    chatBot.style.display = "none"; // Ẩn chat
    showIcon.style.display = "block"; // Hiện icon tin nhắn
    hideIcon.style.display = "none"; // Ẩn icon đóng
  });
});

sentChatBtn.addEventListener("click", handleChat);
