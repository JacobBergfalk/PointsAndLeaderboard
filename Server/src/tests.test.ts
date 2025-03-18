import session from "supertest-session";
import { app } from "../start"; 
import { SuperTest, Test } from "supertest"; // 🟢 Importera typer


let testSession: SuperTest<Test>;


beforeEach(() => {
  testSession = session(app); // Skapa en ny session för varje test
});

test("fetch credits for user session, should not work since it isnt logged in", async () => {
  const res = await testSession.get("/game/balance/get");
  expect(res.status).toBe(401); // Användaren är inte inloggad, bör få 401
});

test("Should register a user", async () => {
  const res = await testSession.post("/game/register").send({
    username: "newUser",
    password: "0000"
  });
  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
});

test("Should login the user", async () => {
  const res = await testSession.post("/game/login").send({
    username: "newUser",
    password: "0000"
  });
  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
});

test("Success to coinflip", async () => {
  await testSession.post("/game/login").send({
    username: "newUser",
    password: "0000"
  });

  const res = await testSession.post("/game/coinflip").send({
    choice: "Heads",
    betAmount: 20
  });
  expect(res.status).toBe(200); 
});

test("should logout the user", async () => {
  const res = await testSession.post("/game/logout").send({
    username: "newUser"
  });
  expect(res.status).toBe(201);
});

test("Fail to coinflip", async () => {
  const res = await testSession.post("/game/coinflip").send({
    choice: "Heads",
    betAmount: 20
  });
  expect(res.status).toBe(401); 
});
