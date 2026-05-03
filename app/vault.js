let inventory = [];
let totalValue = 0;

function addItem() {
    const name = document.getElementById('itemName').value;
    const price = parseFloat(document.getElementById('itemPrice').value);
    const tier = parseFloat(document.getElementById('itemTier').value);
    const goalName = document.getElementById('goalName').value || "Dream Item";
    const goalPrice = parseFloat(document.getElementById('goalPrice').value) || 500;

    if (!name || isNaN(price)) return alert("Please audit an item first! ˙◠˙");

    const marketValue = price * tier;
    totalValue += marketValue;
    const tierLabel = tier === 0.1 ? "Fast Fashion" : tier === 0.4 ? "Mid-Tier" : "Luxury";
    inventory.push({ name, marketValue, tierLabel });

    document.getElementById('totalValue').innerText = `$${totalValue.toFixed(2)}`;
    document.getElementById('displayGoalName').innerText = goalName;

    const progress = Math.min((totalValue / goalPrice) * 100, 100);
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('goalPercent').innerText = Math.floor(progress) + '%';
    
    if (progress >= 100 || tier === 0.7) {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#FF85A2', '#FFD1DC', '#FFF0F3'] });
    }
    document.getElementById('aiResponse').innerText = tier === 0.7 ? "⋆˚꩜ High asset retention detected!" : ".ೀ Item added to ledger.";
}

function downloadReport() {
    if (inventory.length === 0) return alert("Audit list is empty! ⭑");
    let text = "VAULT: CLOSET AUDIT REPORT\n--------------------------\n";
    inventory.forEach(item => { text += `${item.name}: $${item.marketValue.toFixed(2)} (${item.tierLabel})\n`; });
    text += `\nTOTAL EQUITY: $${totalValue.toFixed(2)}\nStatus: AUDIT COMPLETE ⭑｡𖦹°‧.`;
    const blob = new Blob([text], {type: 'text/plain'});
    const a = document.createElement('a');
    a.download = 'Closet_Audit.txt';
    a.href = URL.createObjectURL(blob);
    a.click();
}