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

enum MistakeType {
    NOT_SELECTED = 'not_selected',
    BADLY_SELECTED = 'badly_selected',
}

export interface ReviewMistake {
    mistake_type: MistakeType;
    line: number;
    file_id: string;
    review_id: string;
    correct_smell_id: string;
}

export interface Feedback {
    id?: string;
    review_id: string;
    score: number;
    max_score: number;
    mistakes?: ReviewMistake[];
}
