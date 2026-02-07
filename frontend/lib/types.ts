export interface CreatePasteRequest {
  title?: string;
  content: string;
  language?: string;
  expiresIn?: '1h' | '1d' | '1w' | '1m' | 'never';
}

export interface PasteResponse {
  id: string;
  shortId: string;
  title?: string;
  content: string;
  language: string;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  url?: string
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export const SUPPORTED_LANGUAGES = [
  { value: 'text', label: 'Plain Text' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'c', label: 'C' },
  { value: 'cpp', label: 'C++' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'yaml', label: 'YAML' },
  { value: 'markdown', label: 'Markdown' },
  { value: 'sql', label: 'SQL' },
  { value: 'bash', label: 'Bash' },
  { value: 'powershell', label: 'PowerShell' },
] as const;

export const EXPIRATION_OPTIONS = [
  { value: '1h', label: '1 Hour' },
  { value: '1d', label: '1 Day' },
  { value: '1w', label: '1 Week' },
  { value: '1m', label: '1 Month' },
  { value: 'never', label: 'Never' },
] as const;