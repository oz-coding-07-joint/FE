import { Triangle } from "phosphor-react";

const Arrow: React.FC = () => (
  <div className="flex flex-row mx-1 lg:mx-5 pb-8">
    <Triangle size={25} weight="fill" className="rotate-90 opacity-30" />
    <Triangle size={25} weight="fill" className="rotate-90" />
  </div>
);

export default Arrow;
