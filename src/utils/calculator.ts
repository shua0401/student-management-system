/**
 * 基本的な計算機能を提供するクラス
 */
export class Calculator {
  /**
   * 2つの数値を加算する
   * @param a 第1項
   * @param b 第2項
   * @returns 加算結果
   */
  public add(a: number, b: number): number {
    return a + b;
  }

  /**
   * 2つの数値を減算する
   * @param a 被減数
   * @param b 減数
   * @returns 減算結果
   */
  public subtract(a: number, b: number): number {
    return a - b;
  }

  /**
   * 2つの数値を乗算する
   * @param a 第1項
   * @param b 第2項
   * @returns 乗算結果
   */
  public multiply(a: number, b: number): number {
    return a * b;
  }

  /**
   * 2つの数値を除算する
   * @param a 被除数
   * @param b 除数
   * @returns 除算結果
   * @throws 除数が0の場合エラーを投げる
   */
  public divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('除数は0にできません');
    }
    return a / b;
  }

  /**
   * 数値の累乗を計算する
   * @param base 底
   * @param exponent 指数
   * @returns 累乗結果
   */
  public power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  /**
   * 数値の平方根を計算する
   * @param value 対象の数値
   * @returns 平方根
   * @throws 負の数の場合エラーを投げる
   */
  public sqrt(value: number): number {
    if (value < 0) {
      throw new Error('負の数の平方根は計算できません');
    }
    return Math.sqrt(value);
  }
} 