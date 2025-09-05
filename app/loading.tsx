export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <div className="text-white text-lg font-medium">Loading Know Your Rights...</div>
        <div className="text-gray-300 text-sm">Preparing your legal protection tools</div>
      </div>
    </div>
  );
}
