import { Card, CardBody } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function RatioCard({size}: {size: number}) {
  return (
    <Card
      radius="lg"
      className={`${size > 3 ? "col-span-3":"col-span-2"} bg-white/5  border-none hover:cursor-pointer`}
    >
      <CardBody className="items-center justify-center">
        <div 
          className={
            twMerge(
              `mb-1 rounded-sm border-slate-500 border-2`, (
                size===1 && "w-5 h-5"
              ), size===2 && "w-6 h-4", size===3 && "w-4 h-6", size===4 && "w-8 h-4", size===5 && "w-4 h-8"
            )
          }
        >
        </div>
        <p>
          {size===1 && "1:1" }
          {size===2 && "4:3"}
          {size===3 && "3:4"}
          {size===4 && "16:9"}
          {size===5 && "9:16"}
        </p>
      </CardBody>
    </Card>
  );
}