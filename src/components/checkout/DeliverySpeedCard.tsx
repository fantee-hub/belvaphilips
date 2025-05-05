interface DeliverySpeedCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export default function DeliverySpeedCard({
  title,
  description,
  selected,
  onClick,
}: DeliverySpeedCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative border-[0.5px] p-5 cursor-pointer transition-all ${
        selected ? "border-[#1D1D1B] bg-[#E3E3E3]" : "border-[#1D1D1B]"
      }`}
    >
      {selected && (
        <div className="absolute top-4 right-4 text-sm px-3 py-1 rounded-full ">
          SELECTED
        </div>
      )}
      <h3 className="md:text-base text-lg font-semibold mb-2">{title}</h3>
      <p className="text-[#444444] text-sm max-w-[185px]">{description}</p>
    </div>
  );
}
