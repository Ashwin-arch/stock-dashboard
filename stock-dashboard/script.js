const supportedStocks = ['GOOG', 'TSLA', 'AMZN', 'META', 'NVDA'];
let currentUser = "";
let subscribed = [];
let previousPrices = {};

// ------------------------ LOGIN ------------------------
function login() {
    const email = document.getElementById("user-email").value;

    if (email) {
        currentUser = email;
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("welcome-msg").innerText = `Welcome, ${email}`;
        renderAvailableStocks();
    }
}

// ------------------------ RENDER STOCK LIST ------------------------
function renderAvailableStocks() {
    const container = document.getElementById("stocks-container");
    container.innerHTML = "";

    supportedStocks.forEach(ticker => {
        const div = document.createElement("div");
        div.className = "stock-item";
        div.innerHTML = `
            <span>${ticker}</span>
            <button id="btn-${ticker}" onclick="subscribe('${ticker}')">Subscribe</button>
        `;
        container.appendChild(div);
    });
}

// ------------------------ SUBSCRIBE ------------------------
function subscribe(ticker) {
    if (!subscribed.includes(ticker)) subscribed.push(ticker);

    const btn = document.getElementById(`btn-${ticker}`);
    btn.disabled = true;
    btn.innerText = "Subscribed";
    btn.style.backgroundColor = "#ccc";

    const emptyMsg = document.getElementById("empty-msg");
    if (emptyMsg) emptyMsg.remove();

    const list = document.getElementById("subscribed-list");
    const li = document.createElement("li");
    li.id = `sub-${ticker}`;
    li.innerHTML = `
        <span>${ticker}</span>
        <span class="price" id="price-${ticker}">$0.00</span>
    `;
    list.appendChild(li);
}

// ------------------------ GENERATE RANDOM PRICE ------------------------
function randomPrice(base) {
    return Math.round((base + (Math.random() - 0.5) * 10) * 100) / 100;
}

// Base price reference
const basePrices = {
    GOOG: 1800,
    TSLA: 250,
    AMZN: 150,
    META: 300,
    NVDA: 800
};

// ------------------------ UPDATE PRICES ------------------------
function updatePrices() {
    subscribed.forEach(ticker => {
        const price = randomPrice(basePrices[ticker]);

        const priceElement = document.getElementById(`price-${ticker}`);
        if (!priceElement) return;

        const prev = previousPrices[ticker] || price;

        const colorClass = price >= prev ? "up" : "down";
        const arrow = price >= prev ? "▲" : "▼";

        priceElement.innerHTML = `$${price} <span class="${colorClass}">${arrow}</span>`;

        previousPrices[ticker] = price;
    });
}

// Update every 2 seconds
setInterval(updatePrices, 2000);
