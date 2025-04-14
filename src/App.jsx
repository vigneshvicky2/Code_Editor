import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import LanguageSelector from "./components/LanguageSelector";
import { useEffect } from "react";
function App() {
  useEffect(() => {
    document.title = "Online Compiler By Vignesh";
  }, []);
  return (
    <Box minH="100vh"  bg="#0f0a19" color="gray.500" pc={6} py={8} >
      {/* <LanguageSelector/> */}
      <CodeEditor />
    </Box>
  );
}

export default App;
