import styled from 'styled-components';

export const AccordionWrapper = styled.div`
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 15px;
    overflow: hidden;
`;

export const AccordionHeader = styled.div<{ $isOpen: boolean }>`
    background-color: #f1f3f5;
    padding: 15px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    user-select: none;

    &:hover {
        background-color: #e9ecef;
    }

    span {
        font-size: 1.2em;
        transform: ${({ $isOpen }) =>
            $isOpen ? 'rotate(0deg)' : 'rotate(-90deg)'};
        transition: transform 0.2s ease-in-out;
    }
`;

export const AccordionContent = styled.div`
    padding: 15px;
    border-top: 1px solid #e0e0e0;
    background-color: #fff;
`;

export const FormGroup = styled.div`
    margin-bottom: 15px;

    input,
    select {
        width: 100%;
        padding: 10px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 1em;
        background-color: #fff;

        &:focus {
            border-color: #80bdff;
            outline: 0;
            box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
        }
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: 600;
    }

    h4 {
        margin: 0;
    }

    textarea {
        width: 98%;
        padding: 10px;
    }
`;

export const FormButtons = styled.div`
    display: flex;
    gap: 10px;
`;

export const Button = styled.button<{
    variant?: 'primary' | 'secondary' | 'edit' | 'delete' | 'add';
}>`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.95em;

    ${({ variant }) => {
        if (variant === 'primary')
            return `background-color: #007bff; color: white; &:hover { background-color: #0056b3; }`;
        if (variant === 'secondary')
            return `background-color: #6c757d; color: white; &:hover { background-color: #545b62; }`;
        if (variant === 'edit')
            return `background: none; color: #007bff; padding: 0; margin: 0 10px; &:hover { color: #0056b3; }`;
        if (variant === 'delete')
            return `background: none; color: #dc3545; padding: 0; margin: 0 10px; &:hover { color: #b02a37; }`;
        if (variant === 'add')
            return `width: 100%; background-color: #007bff; color: white; &:hover { background-color: #0056b3; }`;
        return `background-color: #e9ecef; color: #333; &:hover { background-color: #ced4da; }`;
    }}

    &:disabled {
        background-color: #ced4da;
        color: #6c757d;
        cursor: not-allowed;
    }
`;

export const ItemList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const ListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 8px;
    border-bottom: 1px solid #eee;

    & > div > * {
        margin-top: 5px;
        margin-bottom: 5px;
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const CheckboxGroup = styled.div`
    label {
        display: inline-block;
        margin-right: 15px;
        font-weight: normal;
        cursor: pointer;
    }
    input[type='checkbox'] {
        margin-right: 5px;
        vertical-align: middle;
    }
`;

export const SmellRecordItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 8px;

    span {
        font-size: 0.9em;
    }
`;

export const FormWrapper = styled.div`
    padding: 15px;
    border: 1px dashed #ccc;
    margin-top: 15px;
    border-radius: 4px;
    background-color: #fafcff;

    h4 {
        margin-top: 0;
        font-size: 1.1em;
        color: #0056b3;
    }
    h2 {
        margin-top: 0;
    }
`;
