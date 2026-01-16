let provider;
let signer;

const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

connectBtn.onclick = async () => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }

  await window.ethereum.request({ method: "eth_requestAccounts" });

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();

  walletAddress.innerText = "Connected: " + await signer.getAddress();

  loadCandidates();
};
