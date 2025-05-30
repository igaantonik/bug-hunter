import React, { RefObject } from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from 'usehooks-ts';
import useReviewStore from '../../../store/useReviewStore';

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
}

function CustomContextMenu({ ref, items }: CustomContextMenuProps) {
    const { setCurrentSelection, isMenuOpen, setIsMenuOpen } = useReviewStore();
    useOnClickOutside(ref, () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
            setCurrentSelection(null, null);
        }
    });

    return (
        <Container ref={ref} style={{ display: isMenuOpen ? 'block' : 'none' }}>
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
