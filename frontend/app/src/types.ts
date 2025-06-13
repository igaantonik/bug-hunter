export interface Task {
    _id?: string;
    name: string;
    description: string;
    files: string[];
    allowed_time: number | null;
}

export interface File {
    _id?: string;
    name: string;
    lines: Record<string, string>;
    smell_records: SmellRecord[];
}

export interface SmellRecord {
    id?: string;
    lines: number[];
    smell_id: string;
    file_id: string;
}

export interface Smell {
    _id?: string;
    name: string;
}

export interface SmellWithColor extends Smell {
    color: string;
}

export interface Review {
    _id?: string;
    task_id: string;
    reviewed_smells: SmellRecord[];
    username: string;
    time: number;
}

export interface Feedback {
    id?: string;
    review_id: string;
    score: number;
    max_score: number;
}

export interface PredefinedSmell {
    id: string;
    lines: number[];
}

export interface UploadFile {
    file_content: string; // Base64 encoded content
    predefined_smells?: string[];
}

export interface EditFile {
    name: string;
    lines: Record<string, string>;
    smell_records: { lines: number[]; smell_id: string }[];
}

export interface TaskGroup {
    _id?: string;
    name: string;
    access_code: string;
    owner_id: string;
    user_ids: string[];
    tasks: string[];
}