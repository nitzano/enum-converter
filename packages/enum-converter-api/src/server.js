import "@babel/polyfill";
import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Enum Server started on port ${PORT}`);
});
