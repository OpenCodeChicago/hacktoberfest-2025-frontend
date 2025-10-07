function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.08)] animate-pulse">
      <div className="aspect-square bg-gray-200 rounded-xl mb-4"></div>
      
      <div className="flex flex-col h-[200px]">
        <div className="flex justify-between items-center h-6 mb-2">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="w-8 h-3 bg-gray-200 rounded"></div>
          </div>
          <div className="w-16 h-5 bg-gray-200 rounded"></div>
        </div>
        
        <div className="h-10 mb-2">
          <div className="h-4 bg-gray-200 rounded mb-1"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        <div className="h-8 mb-2">
          <div className="h-3 bg-gray-200 rounded mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
        
        <div className="h-10 mb-2">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>
        
        <div className="flex items-center gap-3 mt-auto">
          <div className="w-10 h-10 bg-gray-200 rounded-md"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}

export default function ProductSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }, (_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}