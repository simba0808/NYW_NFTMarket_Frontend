import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";

export default function HighlightSection() {
  return (
    <section className="mt-16">
      <div className="container text-center">
        <h2>Highlighted Gallery</h2>
        <p>The largest and unique Super rare NFT marketplace For crypto-collectibles</p>
        <div className="mt-12 p-2 bg-white/5 rounded-md">
          <Box sx={{ width: "100%", overflowY: "none"}}>
            <ImageList
              variant="masonry"
              cols={5}
            >
              {
                [1, 2, 3, 4, 5, 6, 7, 8].map((item) => {
                  return (
                    <img className="p-1" key={item} src={`/asset/high-${item}.png`} alt="Not Found" />
                  )
                })
              }
            </ImageList>
          </Box>
        </div>
      </div>
    </section>
  );
}