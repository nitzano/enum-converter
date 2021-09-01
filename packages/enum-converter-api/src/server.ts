import { server } from "./app/schemas/schema";

const PORT = process.env.PORT || 5000;

server.listen(PORT).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
