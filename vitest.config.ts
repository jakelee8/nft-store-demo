import path from "node:path";

import {
  defineWorkersConfig,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig(async () => {
  // Read all migrations in the `migrations` directory
  const migrationsPath = path.join(__dirname, "migrations");
  const migrations = await readD1Migrations(migrationsPath);

  return {
    test: {
      setupFiles: ["./test/apply-migrations.ts"],
      poolOptions: {
        workers: {
          singleWorker: true,
          wrangler: { configPath: "./wrangler.toml" },
          miniflare: {
            bindings: { MIGRATIONS: migrations },
            serviceBindings: {
              WORKER: "worker-under-test",
            },

            workers: [
              // Configuration for the "auxiliary" Worker under test.
              // Unfortunately, auxiliary Workers cannot load their configuration
              // from `wrangler.toml` files, and must be configured with Miniflare
              // `WorkerOptions`.
              {
                name: "worker-under-test",
                modules: true,
                scriptPath: "./dist/_worker.js", // Built by `npm run build`
                compatibilityDate: "2024-04-01",
                compatibilityFlags: ["nodejs_compat"],
                d1Databases: ["DB"],
              },
            ],
          },
        },
      },
    },
  };
});
