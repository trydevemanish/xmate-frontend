import { IconType } from "react-icons";

interface FeatureCardProps {
  icon: IconType; 
  title : string;
  description: string;
}

export default function FeatureCard({ icon: Icon,title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col gap-3 border-2 rounded hover:-translate-y-2 hover:transform hover:duration-300 border-violet-500 px-10 py-6 shadow-lg shadow-violet-200">
      <Icon className="size-8 text-violet-500" />
      <p className="text-sm font-yatraone">{title}</p>
      <p className="text-sm leading-6 font-manrope">{description}</p>
    </div>
  );
}
