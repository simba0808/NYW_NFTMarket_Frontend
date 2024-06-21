import { use, useState, type FC } from "react";
import {
  Accordion,
  AccordionItem,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

import PrimaryButton from "@/lib/components/button/PrimaryButton";
import { shortenAddress } from "@/lib/components/profile/profile-kit/ProfileHeader";
import useNFTList from "@/lib/web3/hook/useNFTList";

import type { NFTData } from "@/app/(main)/profile/tabs/TabNFT";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: NFTData | undefined;
};

const NFTModal: FC<Props> = ({ isOpen, onClose, data }) => {
  const [listPrice, setListPrice] = useState<string>("");
  const { isListLoading, isListSuccess, listNFT } = useNFTList();

  return (
    <Modal
      backdrop="blur"
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
      className="z-50 bg-[#19172c]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {data?.token_name}
            </ModalHeader>
            <ModalBody className="font-small">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${data?.asset_url}`}
                alt="NYW"
              />
              <Accordion
                fullWidth
                keepContentMounted
                className="gap-3 px-0"
                itemClasses={{
                  base: "!bg-white/10",
                  title: "font-medium",
                  trigger: "py-4 md:py-6",
                  content: "pt-0 pb-6 text-base text-default-500",
                  indicator: "data-[open=true]:rotate-180",
                }}
                selectionMode="multiple"
                variant="splitted"
              >
                <AccordionItem
                  key={0}
                  indicator={
                    <Icon icon="solar:alt-arrow-down-linear" width={24} />
                  }
                  title="Detailed Information"
                >
                  <p>
                    <span className="font-semibold">Token ID</span>:{" "}
                    {data?.token_id}
                  </p>
                  <p className="mt-1">
                    {" "}
                    <span className="font-semibold">Prompt</span>:{" "}
                    {data?.prompt}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold">Creator</span>:{" "}
                    {shortenAddress(data?.creator as string)}
                  </p>
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <Input
                classNames={{
                  inputWrapper: "w-full h-full bg-white/10 py-2",
                  input: "text-md",
                }}
                placeholder="Insert Listing Price"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
                // endContent={
                //   // <PrimaryButton text="List Now" onClick={() => listNFT(parseInt(data?.token_id as string), listPrice,  )} />}
                //   // />
                // }
              />
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NFTModal;
