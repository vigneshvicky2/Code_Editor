import React from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from "@chakra-ui/react";
import { Language_versions } from "../constants";
const languages = Object.entries(Language_versions);
const Active_color = "blue.400";
const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box ml={2} mb={4}>
      <Text mb={2} fontSize="lg">
        Language:{" "}
      </Text>
      <Menu isLazy>
        <MenuButton as={Button}>{language} </MenuButton>
        <MenuList bg="#110c1b">
          {languages.map(([langName, version]) => (
            <MenuItem
              key={langName}
              color={langName === language ? Active_color : ""}
              bg={langName === language ? "gray.900" : "transparent"}
              _hover={{
                color: Active_color,
                bg: "gray.900",
              }}
              onClick={() => onSelect(langName)}
            >
              {langName}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                {version}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
