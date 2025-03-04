import request from "supertest";
import { app } from "../start"; 
import e from "cors";

/*test("should return a valid response", async () => {
  const response = await request(app)
    .post("/game") 
    .send({
      choice: "heads",
      betAmount: 100,
    });

  console.log("Valid input response:", response.body); // Logga svaret
  expect(response.status).toBe(200);
}); */

test("fetch credits for user session, should not work since it isnt logged in", async() => {
  const res = await request(app).get("/game/balance/get")
  expect(res.status).toBe(401);
})

test("Should register a user", async() => {
  const res = await request(app).post("/game/register").send({
    username: "newUser",
    password: "0000"
  });
  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
});

test("Should login the user", async() => {
  const res = await request(app).post("/game/login").send({
    username: "newUser",
    password: "0000"
  });
  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
});

test("should logout the user", async() => {
  const res = await request(app).post("/game/logout").send({
    username: "newUser"
  });
  expect(res.status).toBe(201);
});

test("Fail to coinflip", async() =>{
  const res = await request(app).post("/game/coinflip").send({
    choice: "Heads",
    betAmount: 20
  })
  expect(res.status).toBe(401);

})