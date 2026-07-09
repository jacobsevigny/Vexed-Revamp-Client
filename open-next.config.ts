import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Default in-memory ISR/data cache. If persistent ISR caching across
// deploys/instances is needed later, add an R2 bucket binding and swap in
// @opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache.
export default defineCloudflareConfig({});
