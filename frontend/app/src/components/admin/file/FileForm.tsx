import React, { useState, useEffect } from 'react';
import { File, Smell, EditFile, PredefinedSmell } from '../../../types';
import { formatPredefinedSmells } from '../../../util/formatPredefinedSmells';
import { parseLinesString } from '../../../util/lineParser';
import {
    Button,
    FormGroup,
    FormButtons,
    SmellRecordItem,
    SmellRecordFormWrapper,
} from '../AdminStyled';

interface BaseFileFormProps {
    onCancel: () => void;
    isSaving: boolean;
    smells: Smell[];
}

interface AddFileFormProps extends BaseFileFormProps {
    mode: 'add';
    onSubmit: (formData: FormData) => void;
}

interface EditFileFormProps extends BaseFileFormProps {
    mode: 'edit';
    initialFileData: File;
    onSubmit: (payload: { _id: string } & EditFile) => void;
}

type FileFormProps = AddFileFormProps | EditFileFormProps;

interface EditableSmellEntry {
    key: string;
    smell_id: string;
    linesString: string;
}

function FileForm(props: FileFormProps) {
    const { onCancel, isSaving, smells } = props;

    const [currentSmellEntries, setCurrentSmellEntries] = useState<
        EditableSmellEntry[]
    >([]);
    const [newEntrySmellId, setNewEntrySmellId] = useState<string>(
        smells[0]?._id || ''
    );
    const [newEntryLinesString, setNewEntryLinesString] = useState<string>('');

    const [selectedFile, setSelectedFile] = useState<globalThis.File | null>(
        null
    );

    const [fileName, setFileName] = useState<string>('');
    const [fileLines, setFileLines] = useState<Record<string, string>>({});

    useEffect(() => {
        if (props.mode === 'edit') {
            setFileName(props.initialFileData.name);
            setFileLines(props.initialFileData.lines);
            const initialEntries = props.initialFileData.smell_records.map(
                (sr, index) => ({
                    key: sr.id || `sr-${index}-${Date.now()}`,
                    smell_id: sr.smell_id,
                    linesString: sr.lines.join(','),
                })
            );
            setCurrentSmellEntries(initialEntries);
        } else {
            setSelectedFile(null);
            setCurrentSmellEntries([]);
        }
        setNewEntrySmellId(smells[0]?._id || '');
        setNewEntryLinesString('');
    }, [props, smells]);

    const handleAddSmellEntry = () => {
        if (!newEntrySmellId || !newEntryLinesString.trim()) {
            alert('Please select a smell and enter line numbers.');
            return;
        }
        setCurrentSmellEntries([
            ...currentSmellEntries,
            {
                key: `new-${Date.now()}`,
                smell_id: newEntrySmellId,
                linesString: newEntryLinesString,
            },
        ]);
        setNewEntrySmellId(smells[0]?._id || '');
        setNewEntryLinesString('');
    };

    const handleRemoveSmellEntry = (keyToRemove: string) => {
        setCurrentSmellEntries(
            currentSmellEntries.filter((entry) => entry.key !== keyToRemove)
        );
    };

    const handleUpdateSmellEntry = (
        keyToUpdate: string,
        field: 'smell_id' | 'linesString',
        value: string
    ) => {
        setCurrentSmellEntries(
            currentSmellEntries.map((entry) =>
                entry.key === keyToUpdate ? { ...entry, [field]: value } : entry
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsedSmellEntriesForPayload = currentSmellEntries
            .map((entry) => ({
                smell_id: entry.smell_id,
                lines: parseLinesString(entry.linesString),
            }))
            .filter((entry) => entry.lines.length > 0);

        if (props.mode === 'add') {
            if (!selectedFile) {
                alert('Please select a file to upload.');
                return;
            }
            const formData = new FormData();
            formData.append('file', selectedFile);

            const predefinedSmellsForApi: PredefinedSmell[] =
                parsedSmellEntriesForPayload.map((entry) => ({
                    id: entry.smell_id,
                    lines: entry.lines,
                }));
            const formattedSmells = formatPredefinedSmells(
                predefinedSmellsForApi
            );
            console.log('Formatted Smells:', formattedSmells);

            if (formattedSmells.length > 0) {
                formData.append('predefined_smells', formattedSmells);
            }
            props.onSubmit(formData);
        } else if (props.mode === 'edit') {
            if (!fileName.trim()) {
                alert('File name cannot be empty.');
                return;
            }
            const updatePayload: EditFile = {
                name: fileName,
                lines: fileLines,
                smell_records: parsedSmellEntriesForPayload,
            };
            props.onSubmit({
                _id: props.initialFileData._id!,
                ...updatePayload,
            });
        }
    };

    const entryTitle =
        props.mode === 'add' ? 'Predefined Smells' : 'Smell Records';
    const addEntryButtonText =
        props.mode === 'add' ? 'Add Predefined Smell' : 'Add Smell Record';

    return (
        <form onSubmit={handleSubmit}>
            <h3>
                {props.mode === 'add'
                    ? 'Add New File'
                    : `Edit File: ${props.initialFileData.name}`}
            </h3>

            {props.mode === 'add' && (
                <FormGroup>
                    <label htmlFor="fileUpload">File:</label>
                    <input
                        type="file"
                        id="fileUpload"
                        onChange={(e) =>
                            setSelectedFile(
                                e.target.files ? e.target.files[0] : null
                            )
                        }
                        required
                        disabled={isSaving}
                    />
                </FormGroup>
            )}

            {props.mode === 'edit' && (
                <FormGroup>
                    <label htmlFor="fileName">File Name:</label>
                    <input
                        type="text"
                        id="fileName"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="e.g., script.py"
                        required
                        disabled={isSaving}
                    />
                </FormGroup>
            )}

            <SmellRecordFormWrapper>
                <h4>{entryTitle}</h4>
                {currentSmellEntries.map((entry) => (
                    <SmellRecordItem key={entry.key}>
                        <FormGroup>
                            <select
                                value={entry.smell_id}
                                onChange={(e) =>
                                    handleUpdateSmellEntry(
                                        entry.key,
                                        'smell_id',
                                        e.target.value
                                    )
                                }
                                disabled={isSaving}
                            >
                                {smells.map((smell) => (
                                    <option key={smell._id} value={smell._id!}>
                                        {smell.name}
                                    </option>
                                ))}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <input
                                type="text"
                                placeholder="Lines (e.g., 1,2,5-7)"
                                value={entry.linesString}
                                onChange={(e) =>
                                    handleUpdateSmellEntry(
                                        entry.key,
                                        'linesString',
                                        e.target.value
                                    )
                                }
                                disabled={isSaving}
                            />
                        </FormGroup>
                        <Button
                            type="button"
                            variant="delete"
                            onClick={() => handleRemoveSmellEntry(entry.key)}
                            disabled={isSaving}
                        >
                            Remove
                        </Button>
                    </SmellRecordItem>
                ))}

                <h5>Add Smell</h5>
                <div>
                    <FormGroup style={{ flexGrow: 1, marginBottom: 0 }}>
                        <label>Smell:</label>
                        <select
                            value={newEntrySmellId}
                            onChange={(e) => setNewEntrySmellId(e.target.value)}
                            disabled={isSaving || smells.length === 0}
                        >
                            {smells.length === 0 && (
                                <option value="">No smells available</option>
                            )}
                            {smells.map((smell) => (
                                <option key={smell._id} value={smell._id!}>
                                    {smell.name}
                                </option>
                            ))}
                        </select>
                    </FormGroup>
                    <FormGroup style={{ flexGrow: 2, marginBottom: 0 }}>
                        <label>Lines:</label>
                        <input
                            type="text"
                            placeholder="e.g., 1,2,5-7"
                            value={newEntryLinesString}
                            onChange={(e) =>
                                setNewEntryLinesString(e.target.value)
                            }
                            disabled={isSaving}
                        />
                    </FormGroup>
                    <Button
                        type="button"
                        onClick={handleAddSmellEntry}
                        disabled={isSaving || !newEntrySmellId}
                    >
                        {addEntryButtonText}
                    </Button>
                </div>
            </SmellRecordFormWrapper>

            <FormButtons style={{ marginTop: '20px' }}>
                <Button
                    type="submit"
                    variant="primary"
                    disabled={
                        isSaving ||
                        (props.mode === 'add' && !selectedFile) ||
                        (props.mode === 'edit' && !fileName.trim())
                    }
                >
                    {isSaving
                        ? 'Saving...'
                        : props.mode === 'add'
                          ? 'Upload and Save File'
                          : 'Save Changes'}
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                    disabled={isSaving}
                >
                    Cancel
                </Button>
            </FormButtons>
        </form>
    );
}

export default FileForm;
