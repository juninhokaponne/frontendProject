import { useToast } from "@chakra-ui/react";

export const showToast = (
  id: string,
  title: string,
  description: string,
  status: "success" | "error",
  toast: any
) => {
  return toast({
    id,
    title,
    description,
    status,
    duration: 4000,
    isClosable: true,
    position: "top-right",
  });
};
