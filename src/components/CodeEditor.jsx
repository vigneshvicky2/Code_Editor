import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("java");

  const onMount = (editor,monaco) => {
    editorRef.current = editor;
    editor.focus();
    monaco.languages.registerCompletionItemProvider('java', {
      provideCompletionItems: () => ({
        suggestions: [
          // System.out.println
          {
            label: 'sout',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'System.out.println(${1:"Hello, World!"});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Print to console'
          },
          // For loop
          {
            label: 'fori',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'for (int i = 0; i < ${1:10}; i++) {\n\t${0}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'For loop'
          },
          // Enhanced for loop
          {
            label: 'for-each',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'for (${1:Object} ${2:element} : ${3:array}) {\n\t${0}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Enhanced for loop'
          },
          // If-else statement
          {
            label: 'ife',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'if (${1:condition}) {\n\t${2:// code}\n} else {\n\t${3:// code}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'If-Else statement'
          },
          // Try-catch block
          {
            label: 'tryc',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'try {\n\t${1:// code}\n} catch (${2:Exception} ${3:e}) {\n\t${4:// handle exception}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Try-Catch block'
          },
          // Switch case
          {
            label: 'switch',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'switch (${1:value}) {\n\tcase ${2:value}:\n\t\t${3:// code}\n\t\tbreak;\n\tdefault:\n\t\t${4:// default code}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Switch case statement'
          },
          // While loop
          {
            label: 'while',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'while (${1:condition}) {\n\t${2:// code}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'While loop'
          },
          // Do-while loop
          {
            label: 'dowhile',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'do {\n\t${1:// code}\n} while (${2:condition});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Do-While loop'
          },
          // Main method (PSVM)
          {
            label: 'psvm',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'public static void main(String[] args) {\n\t${0}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Public static void main method'
          },
          // Constructor
          {
            label: 'constructor',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'public ${1:ClassName}(${2:parameters}) {\n\t${3:// constructor code}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Constructor definition'
          },
          // Getter and Setter methods
          {
            label: 'getter',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'public ${1:type} get${2:Property}() {\n\treturn ${3:this.${2:property}};\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Getter method'
          },
          {
            label: 'setter',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'public void set${1:Property}(${2:type} ${3:value}) {\n\tthis.${1:property} = ${3:value};\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Setter method'
          },
          // Print array
          {
            label: 'printArray',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'System.out.println(Arrays.toString(${1:array}));',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Print array'
          },
          // Import statement
          {
            label: 'import',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'import ${1:package_name};',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Import statement'
          }
        ],
      }),
    });
    
  };
  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%" ml ={6} borderRadius="12px" overflow="hidden" border="1px solid #444">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
            options={{
              snippetSuggestions: "top",
              suggestOnTriggerCharacters: true,
            }}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
