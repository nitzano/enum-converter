import { apolloServer } from "./app/schemas/schema";

const PORT = process.env.PORT || 5000;

apolloServer.listen(PORT).then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
1;
