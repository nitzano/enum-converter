import "@babel/polyfill";
import { startApolloServer } from "./app";

async function startServer() {
  const app = await startApolloServer();
  const PORT = process.env.PORT || 5000;
  console.log(`Enum Server started on port ${PORT}`);
  app.listen(PORT);
}

startServer();
