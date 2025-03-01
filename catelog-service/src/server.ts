import expressApp from "./expressApp";
import { logger } from "./utils";
const PORT = 8000;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
  process.on("uncaughtException", async (err) => {
    logger.error("Uncaught exception: ", err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("Server started successfully");
});
