const { assert } = require("chai");

describe("Game4", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();
    await game.deployed();

    // nested mappings are rough :}

    const [signer] = await ethers.getSigners();
    await game.write(signer.address);

    await game.win(signer.address);

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
