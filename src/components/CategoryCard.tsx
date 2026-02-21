import { Link } from "react-router-dom";
import { Category } from "@/data/mockData";

const CategoryCard = ({ category }: { category: Category }) => (
  <Link
    to={`/category/${category.slug}`}
    className="group block relative overflow-hidden rounded-lg aspect-[4/3] card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1"
  >
    <img
      src={category.image}
      alt={category.name}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <h3 className="text-lg font-semibold text-secondary">{category.name}</h3>
    </div>
  </Link>
);

export default CategoryCard;
