import React, { RefObject } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';

const Container = styled.div`
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.15);
    padding: 5px 0;
    z-index: 20;
    min-width: 150px; /* Minimalna szerokość menu */
`;

const MenuItem = styled.div`
    padding: 8px 15px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export interface CustomContextMenuItem {
    id: string;
    label: string;
    onClick?: () => void;
}

interface CustomContextMenuProps {
    ref: RefObject<HTMLDivElement | null>;
    items: CustomContextMenuItem[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CustomContextMenu({
    ref,
    items,
    isOpen,
    setIsOpen,
}: CustomContextMenuProps) {
    useOnClickOutside(ref, () => {
        setIsOpen(false);
    });

    return (
        <Container ref={ref} style={{ display: isOpen ? 'block' : 'none' }}>
            {items.map((item) => (
                <MenuItem
                    key={item.id}
                    onClick={() => {
                        item.onClick?.();
                    }}
                >
                    {item.label}
                </MenuItem>
            ))}
        </Container>
    );
}

export default CustomContextMenu;
