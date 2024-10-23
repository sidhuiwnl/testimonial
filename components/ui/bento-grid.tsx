import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { Badge } from "./badge";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-3 max-w-7xl mx-auto ",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  imageUrl,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  imageUrl?: string;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border  flex flex-col",
        className
      )}
    >
      <div className="relative w-full h-[70%] overflow-hidden mb-3 hover:rounded-xl">
        {imageUrl ? (
          <Image
            width={500}
            height={500}
            src={imageUrl}
            alt={typeof title === "string" ? title : "Bento grid item"}
            className="w-full h-full object-cover transition-transform duration-200 group-hover/bento:scale-105 rounded-xl "
          />
        ) : (
          <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
        )}
      </div>

      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2">
          <Badge>{title}</Badge>
        </div>
        <div className="font-sans font-medium text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};
