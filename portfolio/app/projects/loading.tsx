import LoadingSkeleton from '@/app/components/LoadingSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-950 text-white pt-20">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="h-12 bg-gray-800 rounded w-64 mb-12 animate-pulse" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}