import React from "react";
import {
  Button,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

export default function Drawer({
  title,
  children,
  open,
  btnRef,
  onClose,
  onSave = () => {},
  placement = "right",
}) {

  return (
    <ChakraDrawer
      isOpen={open}
      placement={placement}
      onClose={onClose}
      finalFocusRef={btnRef}
      size='lg'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        { title && <DrawerHeader>{title}</DrawerHeader>}

        <DrawerBody>{children}</DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={onSave}>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}
