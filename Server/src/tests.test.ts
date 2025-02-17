import request from "supertest";
import { app } from "./router/start"; // Se till att detta pekar rätt till din Express-app
import { Account } from "./model/account";
import { GameService } from "./service/gameService"

test("should return a valid response", async () => {
  const response = await request(app)
    .post("/game") // Express app rutten
    .send({
      choice: "heads",
      betAmount: 100,
    });

  console.log("Valid input response:", response.body); 
  expect(response.status).toBe(200);
});

test("Test om rätt input", async () => {
  const response = await request(app)
    .post("/game") 
    .send({
      choice: "huvud",
      betAmount: 100,
    });

  console.log("Invalid input response:", response.body); 
  expect(response.status).toBe(400);
});

test("Balance test", async () => {
  const response = await request(app)
    .get("/game/balance")

  console.log("Balance", response.body); 
  expect(response.status).toBe(200);
});

test("DisplayCredits() Happy test", async () => {
  const gameService = new GameService(100);
  const balance = await gameService.displayCredits();
  console.log(balance);
});

test("Flipcoin Happy test", async () => {
  const gameService = new GameService(100);
  const Flipcoin = await gameService.flipCoin("heads", 50);
  console.log(Flipcoin);
})

test("Flipcoin error test", async () => {
  const gameService = new GameService(100);
  const Flipcoin = await gameService.flipCoin("tails", -50);
  console.log(Flipcoin);
})




