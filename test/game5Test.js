const { assert } = require("chai");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck
    const [account] = await ethers.getSigners();
    let signer = ethers.Wallet.createRandom(); 
    while(signer.address >= "0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf") {
      signer = ethers.Wallet.createRandom();
    }

    account.sendTransaction({
      to: signer.address, 
      value: ethers.utils.parseEther("200")
    });
    await game.connect(signer.connect(ethers.provider)).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});