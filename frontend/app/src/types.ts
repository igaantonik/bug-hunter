export interface Task {
    _id?: string;
    name: string;
    description: string;
    files: string[];
}

export interface File {
    _id?: string;
    name: string;
    lines: Record<string, string>;
}

export interface Review {
    _id?: string;
    task_id: string;
    reviewed_smells: ReviewedSmell[];
}

export interface ReviewedSmell {
    _id?: string;
    file_id: string;
    line: string;
    smell_id: string;
}

export interface Smell {
    _id?: string;
    name: string;
}
