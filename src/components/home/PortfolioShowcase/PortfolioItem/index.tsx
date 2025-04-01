import { portfolioItems } from "@/lib/mockData";
import Image from "next/image";

const PortfolioItem = ({ item }: { item: (typeof portfolioItems)[0] }) => {
  return (
    <div className="group relative overflow-hidden bg-white">
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-white transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
        <div className="px-5 py-3">
          <div className="flex items-center text-gray-500 mt-1">
            <h3 className="text-sm font-medium text-black">{item.title}</h3>
            <span className="mx-1.5 text-gray-400">·</span>
            <div>
              {item.tags.map((tag, idx) => (
                <span key={idx} className="inline-flex items-center text-sm">
                  {idx > 0 && <span className="mx-1.5 text-gray-400">·</span>}
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-4 text-base font-medium ">{item.price}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
