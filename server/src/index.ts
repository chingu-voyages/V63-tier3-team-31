import { createApp } from "./app.js";
import { db } from "./db/index.js";

const app = createApp(db, {
  secureCookies: process.env.NODE_ENV === "production",
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
