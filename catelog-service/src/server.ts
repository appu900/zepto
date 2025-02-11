import expressApp from "./expressApp";
const PORT = 8000;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  process.on("uncaughtException", async (err) => {
    console.error("Uncaught exception: ", err);
    process.exit(1);
  });
};

StartServer().then(() => {
  console.log("Server started successfully");
});
