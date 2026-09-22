interface SliderProps {
  id: number;
  title: string;
}

export default function Slider(props: SliderProps) {
  const { id, title } = props;
  return (
    <div
      key={id}
      className="max-w-4xl w-full p-5 rounded-xl border border-primary"
    >
      <span className="text-base text-primary">{title}</span>
    </div>
  );
}
