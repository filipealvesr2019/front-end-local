// ExemploComponent.js
import React from 'react';
import styles from './NavBarFromSidebar.module.css'
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, EmailIcon, ExternalLinkIcon, AtSignIcon, CalendarIcon } from '@chakra-ui/icons';

const ExemploMenu = () => {
  return (
    <div className={styles.container}>
         <a href="https://imgur.com/eIsbYKG">
              <img
                src="https://i.imgur.com/eIsbYKG.jpg"
                title="source: imgur.com"
                className={styles.img}
              />
            </a>

            <div>

    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon />}
        variant='outline'
        className={styles.menuButton}
      />
      <MenuList className={styles.menuList}>
        <MenuItem  >
        Produtos 
        </MenuItem>
        <MenuItem >
          Temas 
        </MenuItem>
    
     
      </MenuList>
    </Menu>
            </div>

    </div>
  );
};

export default ExemploMenu;