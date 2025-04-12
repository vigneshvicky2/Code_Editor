import { Button, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Box, Text } from '@chakra-ui/react'
import { executeCode } from '../api'
const Output = ({editorRef, language}) => {
    const toast = useToast();
    const[output, setOutput] = useState(null);
    const[isLoading, setIsLoading] = useState(false);
    const[isError, setIsError] = useState(false);   
    const runCode = async () => {
        const sourceCode = editorRef.current.getValue();
        if(!sourceCode) return;
        try {
            setIsLoading(true);
            const {run:result}= await executeCode(sourceCode, language);
            setOutput(result.output.split("\n"));
            result.stderr ? setIsError(true) : setIsError(false);
        } catch (error) {
            toast({
                title: 'An error occurred',
                description: error.message || "Something went wrong",
                status: 'error',   
                duration: 5000,
            })
        }
        finally{
            setIsLoading(false);
        }

    }
    return (
        <Box w="50%">
            <Text mb={2} fontSize="lg">Output</Text>
            <Button
                variant="outline"
                colorScheme='green'
                mb={4}
                isLoading={isLoading}
                onClick={runCode}
            >
                Run Code
            </Button>
            <Box   
            height ='76vh'
             p ={2}
             color={
                isError ? 'red.400' : ''
             }
             border='1px solid'
             borderRadius={8}
             borderColor={
                isError ? 'red.400' : '#333'
             }
            >
               {
                output ? 
                output.map((line, i) => <Text key={i}>{line}</Text>)    
                :  'Click "Run Code" to see the output here'
               }
            </Box>

        </Box >
    )
}

export default Output