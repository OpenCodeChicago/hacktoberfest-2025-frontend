export default function Loader() {
  return (
    <div
      className="flex place-items-center justify-center min-h-screen"
      role="status"
      aria-live="polite"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <span className="sr-only">Loading content ...</span>
      </div>
    </div>
  );
}
