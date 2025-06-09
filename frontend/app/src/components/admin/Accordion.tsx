import React, { useState, ReactNode } from 'react';
import {
    AccordionWrapper,
    AccordionHeader,
    AccordionContent,
} from './AdminStyled';

interface AccordionProps {
    title: string;
    children: ReactNode;
    startOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    children,
    startOpen = false,
}) => {
    const [isOpen, setIsOpen] = useState(startOpen);

    return (
        <AccordionWrapper>
            <AccordionHeader
                $isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen);
                }}
            >
                {title}
                <span>▼</span>
            </AccordionHeader>
            {isOpen && <AccordionContent>{children}</AccordionContent>}
        </AccordionWrapper>
    );
};

export default Accordion;
