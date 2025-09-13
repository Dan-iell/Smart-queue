const form = document.getElementById("queueForm");
const nameInput = document.getElementById("name");
const waitingList = document.getElementById("waitingList");
const nowServing = document.getElementById("nowServing");
const queueProgress = document.getElementById("queueProgress");
const queuePositionText = document.getElementById("queuePositionText");

let queue = [];
let current = null;
let userQueueNumber = null;
let userName = null;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  if (name) {
    queue.push(name);
    if (!userName) {
      userName = name;
      userQueueNumber = queue.length; // assigned queue number
      alert(`Hi ${name}, your queue number is #${userQueueNumber}`);
    }
    updateUI();
    nameInput.value = "";
  }
});

function updateUI() {
  // Update Now Serving
  nowServing.textContent = current || "No one yet";

  // Update Waiting List with highlights
  waitingList.innerHTML = queue
    .map((person, index) => {
      const isUser = person === userName;
      return `
            <li class="px-3 py-2 rounded-lg ${
              isUser
                ? current === userName
                  ? "bg-green-100 text-green-700 font-bold border border-green-400"
                  : "bg-yellow-100 text-yellow-700 font-semibold border border-yellow-300"
                : "bg-gray-100 text-gray-700"
            }">
              ${index + 1}. ${person} 
              ${
                isUser
                  ? current === userName
                    ? " ✅ It's your turn!"
                    : " ⏳ (your spot)"
                  : ""
              }
            </li>`;
    })
    .join("");

  // Update Progress Bar
  if (queue.length > 0) {
    let position = queue.indexOf(userName) + 1;
    if (position > 0) {
      let progress = ((queue.length - position + 1) / queue.length) * 100;
      queueProgress.style.width = `${progress}%`;
      queuePositionText.textContent = `You are #${position} in queue (${
        queue.length - position
      } ahead of you)`;
    } else {
      queueProgress.style.width = "100%";
      queuePositionText.textContent = "You have been served ✅";
    }
  } else {
    queueProgress.style.width = "0%";
    queuePositionText.textContent = "No one in queue";
  }
}

// Example: Simulate serving
setInterval(() => {
  if (!current && queue.length > 0) {
    current = queue.shift();
  } else if (current && Math.random() > 0.7) {
    current = null;
  }
  updateUI();
}, 3000);
