"use client";
import {
  Text,
  Button,
  Center,
  HStack,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import TestCase from "./components/TestCase";

export default function Home() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("/api/execute", {
      method: "POST",
      body: JSON.stringify({ code: code, input: input }),
    });
    const data = await res.json();
    setOutput(data.data);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      // Perform any custom behavior you desire
      // For example, you can insert spaces instead of switching elements
      const textarea = event.target;
      const { selectionStart, selectionEnd } = textarea;
      const value = textarea.value;
      textarea.value =
        value.substring(0, selectionStart) +
        "    " +
        value.substring(selectionEnd);
      textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
    }
  };

  return (
    <Center flexDirection="column" py={4}>
      <VStack>
        <HStack h="xl">
          <VStack h="full">
            <Text alignSelf={"start"}>Code</Text>
            <Textarea
              placeholder="Paste your code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              w="lg"
              h="full"
              resize="none"
              onKeyDown={handleKeyDown}
            />
          </VStack>
          <VStack h="full">
            <Text alignSelf={"start"}>Input</Text>
            <Textarea
              placeholder="Input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              w="lg"
              h="full"
              resize="none"
            />

            <Text alignSelf={"start"}>Output</Text>
            <Textarea
              placeholder="Output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              w="lg"
              h="full"
              resize="none"
            />
          </VStack>
        </HStack>
        <Button
          colorScheme="blue"
          onClick={handleSubmit}
          size="lg"
          alignSelf="end"
        >
          Submit
        </Button>
        <TestCase
          testCaseNumber={1}
          status="Accepted"
          score={1}
          input={input}
          output={output}
        />
      </VStack>
    </Center>
  );
}
