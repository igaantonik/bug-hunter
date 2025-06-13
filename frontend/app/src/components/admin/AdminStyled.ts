import styled from 'styled-components';

export const AccordionWrapper = styled.div`
    border: 1px solid #d1cec5;
    border-radius: 6px;
    margin-bottom: 12px;
    overflow: hidden;
    width: 70%;
    align-self: center;
    background-color: #fdfcf9;
    box-shadow: 0px 4px 10px rgba(202, 0, 19, 0.08);
    border: 2px solid rgba(202, 0, 19, 0.2);
    border-radius: 12px;
`;

export const AccordionHeader = styled.div<{ $isOpen: boolean }>`
    background-color: white;
    padding: 10px 14px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-family: 'Paytone One', sans-serif;
    font-size: 1em;
    user-select: none;

    &:hover {
        background-color: #fef2f2;;
    }

    span {
        font-size: 1.2em;
        transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(-90deg)')};
        transition: transform 0.2s ease-in-out;
    }
`;

export const AccordionContent = styled.div`
    padding: 12px 14px;
    border-top: 1px solid #d1cec5;
    background-color: #fff;
`;

export const FormGroup = styled.div`
    margin-bottom: 12px;

    label {
        display: block;
        margin-bottom: 4px;
        font-weight: bold;
        font-size: 0.95em;
        font-family: 'Gudea', sans-serif;
    }

    input,
    select,
    textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #d4cfc4;
        border-radius: 6px;
        font-size: 0.95em;
        font-family: 'Gudea', sans-serif;
        background-color: #fff;

        &:focus {
            border-color: #0056b3;
            outline: none;
            box-shadow: 0 0 0 0.1rem rgba(0, 86, 179, 0.2);
        }
    }

    textarea {
        resize: vertical;
    }

    h4 {
        margin: 0;
    }
`;

export const FormButtons = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 10px;
`;

export const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
  vertical-align: middle;
`;

export const Button = styled.button<{
    variant?: 'primary' | 'secondary' | 'edit' | 'delete' | 'add';
}>`
    padding: 6px 14px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85em;
    font-family: 'Gudea', sans-serif;

    ${({ variant }) => {
        if (variant === 'primary')
            return `background-color: #0056b3; color: white; &:hover { background-color: #004494; }`;
        if (variant === 'secondary')
            return `background-color: #6c757d; color: white; &:hover { background-color: #545b62; }`;
        if (variant === 'edit')
            return `background: none; color: #0056b3; padding: 0; margin: 0 6px; font-size: 0.85em; &:hover { color: #004494; }`;
        if (variant === 'delete')
            return `background: none; color: #dc3545; padding: 0; margin: 0 6px; font-size: 0.85em; &:hover { color: #b02a37; }`;
        if (variant === 'add')
            return `width: auto; background-color: #ca0013; color: white; &:hover { background-color:rgb(165, 0, 16); }`;
        return `background-color: #e0ded6; color: #333; &:hover { background-color: #d1cec5; }`;
    }}

    &:disabled {
        background-color: #ccc;
        color: #666;
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
    padding: 8px 6px;
    border-bottom: 1px solid #e0ded6;
    background-color: #fafafa;

    & > div > * {
        margin: 3px 0;
    }

    &:last-child {
        border-bottom: none;
    }
`;

export const CheckboxGroup = styled.div`
    label {
        display: inline-block;
        margin-right: 12px;
        font-weight: normal;
        font-size: 0.9em;
        cursor: pointer;
    }

    input[type='checkbox'] {
        margin-right: 6px;
        vertical-align: middle;
    }
`;

export const SmellRecordItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: #f9f9f9;
    border: 1px solid #eee;
    border-radius: 4px;
    margin-bottom: 6px;

    span {
        font-size: 0.85em;
    }
`;

export const FormWrapper = styled.div`
    padding: 12px;
    border: 1px dashed #ccc;
    margin-top: 12px;
    border-radius: 6px;
    background-color: #fafcff;

    h4 {
        margin-top: 0;
        font-size: 1em;
        color: #0056b3;
    }

    h2 {
        margin-top: 0;
    }
`;
