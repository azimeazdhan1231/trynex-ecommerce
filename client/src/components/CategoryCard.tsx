import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: (categoryId: string) => void;
}

export default function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div
      className="category-card cursor-pointer"
      onClick={() => onClick(category.id)}
    >
      <div className="p-6 text-center">
        <img
          src={category.image}
          alt={category.name}
          className="w-16 h-16 mx-auto mb-4 rounded-full object-cover"
        />
        <h3 className="text-xl font-bold mb-2">
          {category.icon} {category.name}
        </h3>
        <p className="text-gray-600 mb-2">{category.namebn}</p>
        <p className="text-[#d4af37] font-bold">Starting ৳{category.startingPrice}</p>
        <p className="text-sm text-gray-500 mt-1">{category.productCount} products</p>
      </div>
    </div>
  );
}
