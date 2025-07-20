/**
 * ログ出力機能を提供するクラス
 */
export class Logger {
  private prefix: string;

  constructor(prefix: string = 'App') {
    this.prefix = prefix;
  }

  /**
   * 情報レベルのログを出力する
   * @param message ログメッセージ
   */
  public info(message: string): void {
    this.log('INFO', message);
  }

  /**
   * 警告レベルのログを出力する
   * @param message ログメッセージ
   */
  public warn(message: string): void {
    this.log('WARN', message);
  }

  /**
   * エラーレベルのログを出力する
   * @param message ログメッセージ
   */
  public error(message: string): void {
    this.log('ERROR', message);
  }

  /**
   * デバッグレベルのログを出力する
   * @param message ログメッセージ
   */
  public debug(message: string): void {
    this.log('DEBUG', message);
  }

  /**
   * ログを出力する内部メソッド
   * @param level ログレベル
   * @param message ログメッセージ
   */
  private log(level: string, message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level}] [${this.prefix}] ${message}`);
  }
} 