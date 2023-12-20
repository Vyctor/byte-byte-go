import express, { response } from "express";
import cors from "cors";
import { config } from "dotenv";
import { address } from "ip";
import { RedisAdapter } from "./infra/cache/redis-adatper";
import { SimpleValidateApiCallUsecase } from "./application/usecases/simple-validate-api-call.usecase";
config();

const app = express();

app.use(express.json());
app.use(cors());

const redisAdapter = new RedisAdapter();
const simpleValidateApiCallUsecase = new SimpleValidateApiCallUsecase(
  redisAdapter
);

app.get("/simple-valitation", async (req, res) => {
  const ipAddress = address();
  const isAllowed = await simpleValidateApiCallUsecase.execute({ ipAddress });
  if (!isAllowed) {
    return res.status(429).json({ message: "Too Many Requests" });
  }
  return res.status(200).json({ message: "Redirect Call" });
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on port", process.env.APP_PORT);
});
