import expressApp from "./express-app";
const PORT = process.env.APP_PORT || 6000;

export const startServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    console.log(err);
    process.exit(1);
  });
};

startServer().then(() => {
  console.log("Server started successfully");
});


