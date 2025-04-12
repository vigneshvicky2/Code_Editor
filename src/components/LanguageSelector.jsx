import React from 'react'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from '@chakra-ui/react'
import { Language_versions } from '../constants'
const languages = Object.entries(Language_versions);

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box>
      <Text mb={2} fontSize="lg">Language: </Text>
      <Menu>
        <MenuButton as={Button}>
          {language}
        </MenuButton>
        <MenuList>
          {languages.map(([langName, version]) => (
            <MenuItem key={langName} onClick={() => onSelect(langName)}>
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
  )
}


export default LanguageSelector
