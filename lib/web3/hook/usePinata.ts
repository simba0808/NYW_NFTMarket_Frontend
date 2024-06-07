
const usePinata = () => {
  const token = process.env.NEXT_PUBLIC_PINATA_JWT;

  const uploadJSONToIPFS = async (JSONBody: any) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(JSONBody)
      });
      
      const data: any = res.json();
    
      return {
        success: true,
        pinataURL: `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`
      };
    } catch (error: any) {
      console.error(error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  };
  const uploadMetadata = async (nftName: string, nftAssetURL: string) => {
    return new Promise(async (resolve, reject) => {
      if (!nftName || !nftAssetURL) {
        reject(new Error("Missing nftColName or nftFileURL"));
        return;
      }

      const nftJSON = {
        name: nftName,
        image: nftAssetURL,
        description: "Your NFT description here", // Add a description field if you want
        attributes: [], // Add any custom attributes you want here
      };

      try {
        const res = await uploadJSONToIPFS(nftJSON); // Since uploadJSONToIPFS looks like an async function
        if (res.success === true) {
          resolve(res);
        } else {
          throw new Error('Uploading to Pinata failed');
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  return {
    uploadMetadata
  }
}

export default usePinata;