import React from 'react';

export default function HacktoberfestBanner() {
  return (
    <section className="hacktoberfest-banner max-w-4xl mx-auto my-8 p-6 rounded-lg shadow-md bg-gradient-to-r from-purple-600 to-pink-500 text-white flex flex-col sm:flex-row items-center gap-4">
      <img
        src="/docs/assets/hacktoberfest2025.png"
        alt="Hacktoberfest 2025"
        className="h-24 w-auto object-contain"
      />

      <div className="flex-1">
        <h2 className="text-2xl font-semibold">Join Hacktoberfest 2025</h2>
        <p className="mt-1 text-sm opacity-90">
          Contribute to open-source projects, earn swag, and be part of the
          community. Check out the contributing guidelines and look for good
          first issues to get started.
        </p>
      </div>

      <a
        href="/docs/usage.md"
        className="mt-3 sm:mt-0 inline-block bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:opacity-95"
      >
        Learn how to contribute
      </a>
    </section>
  );
}
