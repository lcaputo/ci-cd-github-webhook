import express, { Request, Response } from "express";
import * as crypto from "crypto";

const app = express();
const port = process.env.PORT || 8181;
const WEBHOOK_SECRET: string =
  process.env.WEBHOOK_SECRET || "5b6b0c6b38aeb2f7d70d365feade891a4439c6bf";

app.use(express.json());

const verify_signature = (req: Request) => {
  const signature = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");
  const trusted = Buffer.from(`sha256=${signature}`, "ascii");
  const untrusted = Buffer.from(
    req.headers["x-hub-signature-256"] as string,
    "ascii"
  );
  return crypto.timingSafeEqual(trusted, untrusted);
};

app.post("/webhook/", (req: Request, res: Response) => {
  console.log(req.body);
  if (!verify_signature(req)) {
    res.status(401).send("Unauthorized");
    return;
  }

  // TODO: Logic to handle the event and deploy the site

  res.status(200).send("Webhook received and verified");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
