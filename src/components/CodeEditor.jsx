import { Box, HStack, VStack, useBreakpointValue } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  const layout = useBreakpointValue({ base: VStack, md: HStack });

  return (
    <Box px={4}>
      {React.createElement(layout, { spacing: 4, align: "stretch" },
        <Box w={{ base: "100%", md: "50%" }} borderRadius="12px" overflow="hidden" border="1px solid #444">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
            options={{ fontSize: 14 }}
          />
        </Box>,
        <Output editorRef={editorRef} language={language} />
      )}
    </Box>
  );
};

export default CodeEditor;