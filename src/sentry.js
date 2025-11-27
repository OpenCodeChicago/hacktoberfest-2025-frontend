import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_ENV || "development",
  release: import.meta.env.VITE_SENTRY_RELEASE || "corex-frontend@unknown",

  integrations: [
  Sentry.browserTracingIntegration({
    tracePropagationTargets: [
      "localhost",
      /^https:\/\/corex-supplements\.netlify\.app/,
    ],
  }),
],
  tracesSampleRate: import.meta.env.PROD ? 0.05 : 1.0,
});


export default Sentry;