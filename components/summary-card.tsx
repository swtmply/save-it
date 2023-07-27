import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type SummaryCardProps = {
  title: string;
  description?: string;
  amount: number;
};

const SummaryCard = ({ amount, title, description }: SummaryCardProps) => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>
          <span className="text-sm">{title}</span>
        </CardTitle>
        <CardContent className="p-0">
          <p className="font-bold text-2xl">
            {Intl.NumberFormat("en-US", {
              currency: "PHP",
              style: "currency",
            }).format(amount)}
          </p>
        </CardContent>
        <CardFooter className="p-0 text-sm text-slate-500">
          {description}
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default SummaryCard;
