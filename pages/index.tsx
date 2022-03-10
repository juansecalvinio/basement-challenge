import * as React from "react";
import type {GetStaticProps, NextPage} from "next";
import {
  Box,
  Button,
  Flex,
  Grid,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  useDisclosure,
  StackDivider,
} from "@chakra-ui/react";
import Image from "next/image";

import logo from "../public/logo.svg";
import header from "../public/header.svg";
import footer from "../public/footer.svg";
import yourCart from "../public/your-cart.svg";
import checkout from "../public/checkout.svg";
import {Product} from "../product/types";

interface Props {
  products: Product[];
}

const Home: NextPage<Props> = ({products}) => {
  const {isOpen: isModalOpen, onClose: closeModal, onOpen: openModal} = useDisclosure();
  const [cart, setCart] = React.useState<Product[]>([]);
  const total = React.useMemo(
    () => cart.reduce((total, product) => total + product.price, 0),
    [cart],
  );

  return (
    <>
      <Stack>
        <Stack
          as="nav"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          padding={4}
        >
          <Image alt="Basement" src={logo} />
          <Button variant="outline" onClick={openModal}>
            Cart ({cart.length})
          </Button>
        </Stack>
        <Stack as="header" padding={2}>
          <Image alt="Basement" src={header} />
          <Text
            as={"marquee" as any}
            fontSize="2xl"
            fontWeight="bold"
            borderBottomWidth={2}
            borderColor="white"
            borderTopWidth={2}
          >
            A man can&apos;t have enough basement swag —  A man can&apos;t have enough basement swag
          </Text>
        </Stack>
        <Grid gap={2} templateColumns="repeat(auto-fit, minmax(256px, 1fr))">
          {products.map((product) => (
            <Stack
              key={product.id}
              cursor="pointer"
              onClick={() => setCart((cart) => cart.concat(product))}
            >
              <Flex
                alignItems="center"
                bgGradient="linear(to-b, rgba(21, 21, 21, 0) 0%, #1D1D1D 100%)"
                justifyContent="center"
                margin="auto"
                width="100%"
              >
                <Box>
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fixed"
                    width={320}
                    height={400}
                  />
                </Box>
              </Flex>
              <Stack
                alignItems="center"
                borderTopColor="white"
                borderTopWidth={2}
                direction="row"
                fontSize="lg"
                justifyContent="space-between"
              >
                <Text>{product.name}</Text>
                <Text>$ {product.price}</Text>
              </Stack>
            </Stack>
          ))}
        </Grid>
        <Image alt="Wear everyday" src={footer} />
      </Stack>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay onClick={closeModal} />
        <Stack
          backgroundColor="black"
          borderWidth={2}
          borderColor="white"
          maxWidth={480}
          position="fixed"
          right={0}
          top={0}
          width="100%"
          zIndex={10000}
        >
          <Button
            color="white"
            fontFamily={"Basement Grotesque"}
            fontSize="2xl"
            fontWeight="bold"
            marginLeft="auto"
            textTransform="uppercase"
            variant="link"
            paddingX={4}
            paddingY={2}
          >
            Close
          </Button>
          <Image src={yourCart} />
          <Box paddingY={2}>
            {cart.map((product, index) => (
              <Stack
                key={index}
                color="white"
                cursor="pointer"
                fontFamily={"Basement Grotesque"}
                fontWeight="bold"
                direction="row"
                fontSize="xl"
                alignItems="center"
                justifyContent="space-between"
                paddingX={4}
                onClick={() => setCart((cart) => cart.filter((_, _index) => index !== _index))}
              >
                <Text>{product.name}</Text>
                <Text>$ {product.price}</Text>
              </Stack>
            ))}
          </Box>
          <Stack
            color="white"
            divider={<StackDivider borderColor="white" />}
            direction="row"
            padding={4}
            borderTopWidth={2}
            borderTopColor="white"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              fontFamily={"Basement Grotesque"}
              fontWeight="bold"
              flex={1}
              textTransform="uppercase"
              fontSize="xl"
            >
              Total: $ {total}
            </Text>
            <Button variant="link">
              <Image src={checkout} width={150} />
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props, any> = async () => {
  const products: Product[] = await import("../product/mock.json").then((res) => res.default);

  return {
    props: {
      products,
    },
  };
};

export default Home;
