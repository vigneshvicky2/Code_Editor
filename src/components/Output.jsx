import { Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { executeCode } from '../api'
import Input from './Input'

const Output = ({ editorRef, language }) => {
    const toast = useToast();
    const [output, setOutput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [input, setInput] = useState("");

    const handleDownload = () => {
        const code = editorRef.current.getValue();
        const joined_output = output.join("\n") || '';
        const commentBlock = {
            javascript: `/*\n----- Output -----\n${joined_output}\n*/`,
            typescript: `/*\n----- Output -----\n${joined_output}\n*/`,
            python: `"""\n----- Output -----\n ${joined_output}\n"""`,
            java: `/*\n----- Output -----\n${joined_output}\n*/`,
            csharp: `/*\n----- Output -----\n${joined_output}\n*/`,
            php: `/*\n----- Output -----\n${joined_output}\n*/`,
            rust: `/*\n----- Output -----\n${joined_output}\n*/`,
            c: `/*\n----- Output -----\n${joined_output}\n*/`,
            cpp: `/*\n----- Output -----\n${joined_output}\n*/`,
        };

        const getJavaClassName = (code) => {
            const classNameMatch = code.match(/class\s+(\w+)/);
            return classNameMatch ? classNameMatch[1] : 'HelloWorld';
        };
         // File extension mapping
         const extensionMap = {
            javascript: "js",
            typescript: "ts",
            python: "py",
            java: "java",
            csharp: "cs",
            php: "php",
            rust: "rs",
            c: "c",
            cpp: "cpp",
        };

        // Prompt the user for filename for non-Java languages
        let fileName = "";
        if (language === "java") {
            fileName = getJavaClassName(code) + ".java";
        } else {
            fileName = prompt("Enter the filename:", "code-with-output") + `.${extensionMap[language]}`;
            if (fileName==="null"+`.${extensionMap[language]}`) return;
        }

        // Append the output comment to the code
        const outputComment = commentBlock[language];

        // Blob to download the file
        const blob = new Blob([code + "\n\n" + outputComment], { type: "text/plain;charset=utf-8" });

        // Use the fileName determined above
        const extension = extensionMap[language] || "txt";
        const fileNameWithExtension = fileName || `code-with-output.${extension}`;

        // Create an invisible download link and trigger it
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = fileNameWithExtension;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if (!sourceCode) return;
        try {
            setIsLoading(true);
            const { run: result } = await executeCode(sourceCode, language, input);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            toast({
                title: 'An error occurred',
                variant: 'solid',
                description: error.message || "Something went wrong",
                status: 'error',
                duration: 5000,
            })
        }
        finally {
            setIsLoading(false);
        }

    }
    return (
        <Box w="50%" >
            <Text mb={2} fontSize="lg">Output</Text>
            <Button
                variant="outline"
        
                colorScheme='green'
                mb={4}
                loadingText="Running..."
                isLoading={isLoading}
                onClick={runCode}
            >
                Run Code
            </Button>
            <Button
                variant="outline"
                colorScheme='green'
                mb={4}
                ml={4}
                onClick={handleDownload}
                isDisabled={!output}
            >
                Download Code + Output
            </Button>
            <Box
                height="50vh"
                p={2}
                overflowY="auto"
                fontFamily="monospace"
                color={isError ? 'red.400' : ''}
                border="1px solid"
                borderRadius={8}
                borderColor={isError ? 'red.400' : '#333'}
                mr={4}
                mb={4}
            >
                {
                    output ?
                        output.map((line, i) => (
                            <Text key={i} whiteSpace="pre">{line}</Text>
                        ))
                        : 'Click "Run Code" to see the output here'
                }
            </Box>


            <Input input={input} setInput={setInput} />

        </Box >
    )
}

export default Output