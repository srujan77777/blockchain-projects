const CONTRACT_ADDRESS = "PASTE_LATEST_CONTRACT_ADDRESS_HERE";

let contractABI;

async function loadABI() {
  const res = await fetch("abi/Voting.json");
  contractABI = await res.json();
}

async function loadCandidates() {
  if (!signer) return;

  if (!contractABI) await loadABI();

  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    contractABI,
    signer
  );

  const container = document.getElementById("candidates");
  container.innerHTML = "";

  const count = await contract.getCandidatesCount();

  for (let i = 0; i < count; i++) {
    const candidate = await contract.candidates(i);

    const btn = document.createElement("button");
    btn.innerText = `${candidate.name} (${candidate.voteCount})`;

    btn.onclick = async () => {
      const tx = await contract.vote(i);
      await tx.wait();
      loadCandidates();
    };

    container.appendChild(btn);
    container.appendChild(document.createElement("br"));
  }
}
