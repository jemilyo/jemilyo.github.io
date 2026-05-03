let inventory = [];
let totalValue = 0;

function addItem() {
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const tier = parseFloat(document.getElementById('itemTier').value);
    
    // Custom Goal Logic
    const goalName = document.getElementById('goalName').value || "Dream Item";
    const goalPrice = parseFloat(document.getElementById('goalPrice').value) || 500;

    if (!name || isNaN(price)) return alert("Please audit an item first! ˙◠˙");

    const marketValue = price * tier;
    totalValue += marketValue;
    
    // Update UI
    document.getElementById('totalValue').innerText = `$${totalValue.toFixed(2)}`;
    document.getElementById('displayGoalName').innerText = goalName;

    // Progress Calculation
    const progress = Math.min((totalValue / goalPrice) * 100, 100);
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('goalPercent').innerText = Math.floor(progress) + '%';
    
    if (progress >= 100) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF85A2', '#FFD1DC'] });
    }

    // AI Consultant logic
    document.getElementById('aiResponse').innerText = tier === 0.7 ? "⋆˚꩜ High asset retention!" : ".ೀ Item added to ledger.";
}