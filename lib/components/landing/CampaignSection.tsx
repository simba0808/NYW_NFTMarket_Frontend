import ImageCarousel from "@/lib/components/carousel/ImageCarousel";

export default function CampaignSection() {
  return (
    <section className="mt-16">
      <div className="container">
        <div className="text-center">
          <h2>Top Collection</h2>
          <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
          <div className="mt-10">
            <ImageCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}