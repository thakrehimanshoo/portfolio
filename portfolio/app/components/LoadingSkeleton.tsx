export default function LoadingSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="h-48 bg-gray-700" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-700 rounded w-3/4" />
          <div className="h-4 bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-700 rounded w-5/6" />
          <div className="flex gap-2">
            <div className="h-6 bg-gray-700 rounded w-16" />
            <div className="h-6 bg-gray-700 rounded w-16" />
            <div className="h-6 bg-gray-700 rounded w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}