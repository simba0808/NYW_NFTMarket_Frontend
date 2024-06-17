import { Button, Image, Input } from "@nextui-org/react";

export default function ArtworkDetailView({ imageSrc }: { imageSrc: string }) {
  return (
    <div>
      <div>
        <h2>Title</h2>
        <div className="flex justify-between">
          <div>3 weeks ago</div>
          <div></div>
        </div>
        <div>
          <Image src={imageSrc} alt="Not Found" />
        </div>
        <div>
          <Input
            className="rounded-full px-6 py-3"
            endContent={<Button content="Mint" />}
          />
        </div>
      </div>
    </div>
  );
}
