import request from "supertest";
import { app } from "./router/start"; // Se till att detta pekar rätt till din Express-app'

test("should return a valid response", async () => {
  const response = await request(app)
    .post("/game") // Kontrollera att denna rutt matchar din Express-app
    .send({
      choice: "heads",
      betAmount: 100,
    });

  expect(response.status).toBe(200);
});

  