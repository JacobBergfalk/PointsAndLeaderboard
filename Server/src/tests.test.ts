import request from "supertest";
import { app } from "./start"; // Se till att detta pekar rätt till din Express-app

test("should return a valid response", async () => {
  const response = await request(app)
    .post("/game") // Kontrollera att denna rutt matchar din Express-app
    .send({
      choice: "heads",
      betAmount: 100,
    });

  console.log("Valid input response:", response.body); // Logga svaret
  expect(response.status).toBe(200);
});

test("Test om rätt input", async () => {
  const response = await request(app)
    .post("/game") // Kontrollera att denna rutt matchar din Express-app
    .send({
      choice: "huvud",
      betAmount: 100,
    });

  console.log("Invalid input response:", response.body); // Logga svaret
  expect(response.status).toBe(406);
});
