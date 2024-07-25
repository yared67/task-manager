const ProgressBar = ({ progress }) => {
  const colors = [
    'rgb(255, 214, 161)',
    'rgb(255, 175, 163)',
    'rgb(108, 115, 148)',
    'rgb(142, 181, 145)'
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <div className="w-48 h-3.5 bg-gray-300 rounded overflow-hidden">
      <div
        className="h-full"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
}

export default ProgressBar;
