import { ExpressApp } from "./express-app";
import { logger } from "./utils/logger";
const PORT = process.env.APP_PORT || 6000;

export const startServer = async () => {
  const expressApp = await ExpressApp();
  expressApp.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

startServer().then(() => {
  logger.info("Server started successfully");
});
