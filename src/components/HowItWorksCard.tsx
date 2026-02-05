import Image from "next/image";
import { cn } from "@/lib/utils";
import catCardBackface from "@/assets/images/img-cat-decoration-card-backface.svg";

interface HowItWorksCardProps {
  item: {
    id: number;
    title: string;
    description: string;
  };
  index: number;
}

const HowItWorksCard = ({ item, index }: HowItWorksCardProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 left-14 right-14 lg:left-0 lg:right-0 h-full card opacity-0",
        `card-${index}`,
      )}
    >
      {/* 3D Flip Card */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full preserve-3d",
          `card-${index}-inner`,
        )}
      >
        {/* Face (Title) */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden flex flex-col items-start justify-start p-6 bg-sapphire-400 rounded-2xl shadow-xl border-8 border-primary z-10",
            `card-${index}-face`,
          )}
        >
          <h3 className="text-white text-4xl lg:text-[4rem] font-extrabold text-left">
            {item.title}
          </h3>
        </div>

        {/* Backface (Description) - Rotated by 180deg on X axis */}
        <div
          className={cn(
            "absolute inset-0 backface-hidden rotate-x-180 flex flex-col items-center justify-center p-8 bg-sapphire-400 rounded-2xl shadow-xl border-8 border-primary",
            `card-${index}-back`,
          )}
        >
          <p className="font-inter text-white text-lg lg:text-4xl font-medium text-center leading-relaxed">
            {item.description}
          </p>

          <Image
            loading="lazy"
            src={catCardBackface}
            alt="Cat decoration"
            width={300}
            height={300}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-52"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksCard;
