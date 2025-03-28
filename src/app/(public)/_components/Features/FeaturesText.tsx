interface FeatureTextProps {
  quote: string;
  author: string;
  title: string;
  description: string;
  alignRight?: boolean;
}

const FeatureText = ({
  quote,
  author,
  title,
  description,
  alignRight = false,
}: FeatureTextProps) => {
  return (
    <div
      className={`text-lg flex flex-col ${
        alignRight
          ? "items-start text-left lg:items-end lg:text-right"
          : "items-start text-left"
      }`}
    >
      <span className="italic opacity-80">{`"${quote}"`}</span>
      <span className="text-sm opacity-60">{author}</span>
      <span className="text-accent-500 text-2xl font-semibold pt-5">
        {title}
      </span>
      <p className="whitespace-pre-line leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureText;
