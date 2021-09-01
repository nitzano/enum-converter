import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.send("enum conveter api");
});

export default router;
