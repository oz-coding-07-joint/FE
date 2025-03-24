import Image, { StaticImageData } from "next/image";

interface LearnStepProps {
  step: string;
  icon: StaticImageData;
  description: string;
}

const LearnStep = ({ step, icon, description }: LearnStepProps) => {
  return (
    <div className="w-48 h-[350px] bg-opacity-25 flex flex-col justify-center gap-10 ">
      <div className="flex flex-col items-center gap-8">
        <span className="text-4xl font-semibold opacity-40">{step}</span>
        <div className="bg-white bg-opacity-10 w-40 h-40 rounded-full flex justify-center items-center">
          <Image src={icon} alt="Step Icon" className="w-[62px]" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span className="whitespace-pre-line text-center">{description}</span>
      </div>
    </div>
  );
};

export default LearnStep;
