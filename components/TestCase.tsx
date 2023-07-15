"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Text,
  Textarea,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { ProblemInput } from "@/lib/types";

function TestCase({ props }: { props: ProblemInput }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box w="full">
      <Button onClick={handleToggle} w="full" colorScheme="green">
        <Flex justifyContent="space-between" w="full" p={4}>
          <Box>Test #{props.testcase_id}:</Box>
          <Box>Ongoing</Box>
        </Flex>
      </Button>
      <Collapse in={isExpanded}>
        <Box p={4} bg="gray.100">
          <Text alignSelf={"start"}>Input</Text>
          <Textarea
            value={props.input}
            fontSize={18}
            bg="whitealpha.700"
            h="2xs"
            resize="none"
            isReadOnly
          />
          <HStack w="full">
            <Box w="full">
              <Text alignSelf={"start"}>Output</Text>
              <Textarea
                value={props.output}
                fontSize={18}
                bg="whitealpha.700"
                h="2xs"
                resize="none"
                isReadOnly
              />
            </Box>
            <Box w="full">
              <Text alignSelf={"start"}>Expected Output</Text>
              <Textarea
                value={props.output}
                bg="whitealpha.700"
                h="2xs"
                resize="none"
                isReadOnly
              />
            </Box>
          </HStack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default TestCase;
