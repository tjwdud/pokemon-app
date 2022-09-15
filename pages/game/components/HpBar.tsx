const HpBar = ({
  percentage,
  color,
}: {
  percentage: number;
  color: string;
}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5  self-center">
      <div
        className={`transition-all ease-out duration-1000 bg-green-600 h-2.5 rounded-full ${
          color === 'green' && 'bg-green-400'
        } ${color === 'red' && 'bg-red-400'} ${
          color === 'emerald' && 'bg-emerald-300'
        } ${color === 'cyan' && 'bg-cyan-300'} ${
          color === 'sky' && 'bg-sky-400'
        } ${color === 'indigo' && 'bg-indigo-300'}`}
        style={
          percentage > 100 ? { width: '100%' } : { width: `${percentage}%` }
        }
      ></div>
    </div>
  );
};

export default HpBar;
