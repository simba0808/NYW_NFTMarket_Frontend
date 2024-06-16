import { Image } from "@nextui-org/react";
import { useAccount } from "wagmi";
import { Box, ImageList } from "@mui/material";

import { postServer } from "@/lib/net/fetch/fetch";
import { useCallback, useEffect, useState } from "react";

type ArtworkData = {
  image_id: number;
  image_name: string;
  image_owner: string;
};

const TabArtwork = () => {
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const { address } = useAccount();

  const fetchArtworks = useCallback(async () => {
    try {
      const res = await postServer("/artwork/fetch", { address });
      console.log(res);
      setArtworks(res);
    } catch (err) {
      console.log(err);
    }
  }, [address]);

  useEffect(() => {
    fetchArtworks();
  }, [address]);

  return (
    <div className="flx flex-wrap">
      <Box sx={{ width: "100%", overflowY: "none" }}>
        <ImageList variant="masonry" cols={4} gap={10}>
          {artworks.map((artwork, index) => {
            return (
              <Image
                key={index}
                className="py-1"
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${artwork.image_name}`}
                alt="Your Artwork"
              />
            );
          })}
        </ImageList>
      </Box>
    </div>
  );
};

export default TabArtwork;
