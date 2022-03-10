import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  components: {
    Button: {
      variants: {
        outline: {
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 9999,
        }
      }
    }
  }
})