declare module "supertest-session" {
    import { SuperTest, Test } from "supertest";
    import { Application } from "express";
  
    interface Session extends SuperTest<Test> {}
  
    export default function session(app: Application): Session;
  }
  