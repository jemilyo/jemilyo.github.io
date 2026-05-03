// Vault App Logic ⭑｡𖦹°‧. 
let inventory = [];
let totalLiquidationValue = 0;
const GOAL_AMOUNT = 500;

// 1. The Confetti Magic ⋆˚꩜｡
function fireConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF85A2', '#FFD1DC', '#FFF0F3']
    });
}

// 2. The Goal Tracker Logic
function updateGoal() {
    const percentage = Math.min((totalLiquidationValue / GOAL_AMOUNT) * 100, 100);
    const progressBar = document.getElementById('progressBar');
    const goalPercent = document.getElementById('goalPercent');
    
    if (progressBar && goalPercent) {
        progressBar.style.width = percentage + '%';
        goalPercent.innerText = Math.floor(percentage) + '%';
    }
    
    if (percentage === 100) {
        fireConfetti();
        document.getElementById('aiResponse').innerHTML = `<strong>Consultant:</strong> ⋆˚꩜｡ GOAL REACHED! You've audited enough assets to fund your Prada Bag!`;
    }
}

// 3. Adding Items (The Audit Entry)
function addItem() {
    const nameInput = document.getElementById('itemName');
    const priceInput = document.getElementById('itemPrice');
    const tierSelect = document.getElementById('itemTier');

    const name = nameInput.value;
    const price = parseFloat(priceInput.value);
    const tier = parseFloat(tierSelect.value);

    if (!name || isNaN(price)) {
        alert("Please fill in all fields! ˙◠˙");
        return;
    }

    const marketValue = price * tier;
    totalLiquidationValue += marketValue;

    // Trigger confetti for Luxury items ⭑
    if (tier === 0.70) fireConfetti();

    const item = { 
        id: Date.now(), 
        name, 
        price, 
        tierName: tierSelect.options[tierSelect.selectedIndex].text, 
        marketValue 
    };
    
    inventory.push(item);

    renderInventory();
    updateGoal();
    
    // AI Response Logic
    const aiBox = document.getElementById('aiResponse');
    aiBox.innerHTML = tier === 0.70 ? 
        `<strong>Consultant:</strong> ⋆˚꩜ High-value asset detected! ${name} is a great investment.` : 
        `<strong>Consultant:</strong> .ೀ ${name} added to the audit. Progressing toward your goal!`;

    // Clear inputs
    nameInput.value = '';
    priceInput.value = '';
}

// 4. Deleting Items (Liquidation)
function deleteItem(id) {
    const index = inventory.findIndex(item => item.id === id);
    if (index > -1) {
        totalLiquidationValue -= inventory[index].marketValue;
        inventory.splice(index, 1);
        renderInventory();
        updateGoal();
    }
}

// 5. Rendering the UI
function renderInventory() {
    const list = document.getElementById('inventory');
    const totalDisplay = document.getElementById('totalValue');
    
    list.innerHTML = '';
    inventory.forEach(item => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `
            <span>${item.name} .ೀ</span>
            <span>$${item.marketValue.toFixed(2)} <button class="delete-btn" onclick="deleteItem(${item.id})">✖</button></span>
        `;
        list.appendChild(div);
    });
    totalDisplay.innerText = `$${totalLiquidationValue.toFixed(2)}`;
}

// 6. Exporting the Audit Report
function downloadReport() {
    if (inventory.length === 0) {
        alert("Nothing to audit yet! ⭑");
        return;
    }
    
    let text = "VAULT: CLOSET AUDIT REPORT\\nAuditor: Jemily Ortega\\n\\n";
    inventory.forEach(i => {
        text += `${i.name}: $${i.marketValue.toFixed(2)} (Basis: ${i.tierName})\\n`;
    });
    text += `\\nTOTAL CASH POTENTIAL: $${totalLiquidationValue.toFixed(2)}\\n`;
    text += "Status: AUDIT COMPLETE ⭑｡𖦹°‧.";
    
    const blob = new Blob([text], {type: 'text/plain'});
    const a = document.createElement('a');
    a.download = 'Closet_Audit_Report.txt';
    a.href = URL.createObjectURL(blob);
    a.click();
}