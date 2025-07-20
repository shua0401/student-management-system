// Notionテーブル追記システム
import { NotionClient } from './notion';

/**
 * メイン関数
 */
async function main() {
  console.log('🚀 Notionテーブル追記システムを開始します...\n');
  
  // Notionクライアントを作成
  const notion = new NotionClient();
  
  // 設定をチェック
  notion.checkConfig();
  
  try {
    // サンプルデータを追加
    console.log('\n📝 サンプルデータを追加します...');
    await notion.addRow('テストユーザー', 'test@example.com', '備考');
    
    console.log('\n🎉 システムが正常に動作しました！');
    
  } catch (error) {
    console.error('\n💥 システムでエラーが発生しました');
    console.error('設定を確認してください:');
    console.error('1. config.tsファイルでトークンとデータベースIDを設定');
    console.error('2. NotionでIntegrationを有効化');
    console.error('3. データベースにIntegrationを追加');
  }
}

// プログラムを実行
main(); 