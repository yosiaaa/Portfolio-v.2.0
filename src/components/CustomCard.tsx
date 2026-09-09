import { Card } from "@/components/ui/card";

type CardProps = {
  name: string;
  image: string;
};

export function CardProject(props: CardProps) {
  const { image, name } = props;
  return (
    <Card className="relative w-full max-w-2xl pt-0">
      <div className="absolute inset-0 z-30 aspect-video" />
      <img
        src={image}
        alt={name}
        className="relative z-20 aspect-video w-full object-cover"
      />
    </Card>
  );
}
