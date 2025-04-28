export interface Task {
    id?: string;
    name: string;
    description: string;
    files: File[];
}

export interface File {
    id?: string;
    name: string;
    lines: Record<string, string>;
}

export interface Review {
    id?: string;
    task_id: string;
    reviewed_smells: ReviewedSmell[];
}

export interface ReviewedSmell {
    id?: string;
    file_id: string;
    line: string;
    smell_id: string;
}

export interface Smell {
    id?: string;
    name: string;
}
