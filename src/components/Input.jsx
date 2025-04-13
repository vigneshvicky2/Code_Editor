import { Textarea, Text, Box } from '@chakra-ui/react';

const Input = ({ input, setInput }) => {

  return (
    <Box   height ='25vh' mr={4}>
      <Text mb={3} fontSize="lg">Input</Text>
      <Textarea
        placeholder="Enter your input here"
        size="md"
        height="75%"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </Box>
  );
  
};

export default Input;
