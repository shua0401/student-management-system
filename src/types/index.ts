/**
 * アプリケーションで使用する型定義
 */

// 計算結果の型
export interface CalculationResult {
  operation: string;
  operands: number[];
  result: number;
  timestamp: Date;
}

// ログエントリの型
export interface LogEntry {
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  timestamp: Date;
  prefix: string;
}

// 設定オプションの型
export interface AppConfig {
  debug: boolean;
  logLevel: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  maxCalculations: number;
}

// ユーザー入力の型
export interface UserInput {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt';
  operands: number[];
}

// APIレスポンスの型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
} 