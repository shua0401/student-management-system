import axios from 'axios';
import { config } from './config';

/**
 * Notionテーブルにデータを追加するクラス
 * 
 * 使い方：
 * const notion = new NotionClient();
 * await notion.addRow('テストユーザー', 'test@example.com', '備考');
 */
export class NotionClient {
  private token: string;
  private databaseId: string;

  constructor() {
    this.token = config.NOTION_TOKEN;
    this.databaseId = config.DATABASE_ID;
  }

  /**
   * テーブルに新しい行を追加する
   * @param name 名前
   * @param email メールアドレス
   * @param message メッセージ
   */
  async addRow(name: string, email: string, message: string): Promise<void> {
    try {
      console.log('📝 Notionテーブルにデータを追加中...');
      
      // Notion APIに送信するデータを作成
      const data = {
        parent: {
          database_id: this.databaseId
        },
        properties: {
          // 名前の列（Title型）
          'name': {
            title: [
              {
                text: {
                  content: name
                }
              }
            ]
          },
          // メールアドレスの列（Text型）
          'email': {
            rich_text: [
              {
                text: {
                  content: email
                }
              }
            ]
          },
          // メッセージの列（Text型）
          'message': {
            rich_text: [
              {
                text: {
                  content: message
                }
              }
            ]
          }
        }
      };

      // Notion APIにリクエストを送信
      const response = await axios.post(
        `${config.NOTION_API_URL}/pages`,
        data,
        {
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ データの追加が完了しました！');
      console.log(`📄 ページID: ${response.data.id}`);
      
    } catch (error: any) {
      console.error('❌ エラーが発生しました:');
      
      if (error.response) {
        // APIからのエラーレスポンス
        console.error(`ステータス: ${error.response.status}`);
        console.error(`メッセージ: ${error.response.data.message || '不明なエラー'}`);
      } else if (error.request) {
        // ネットワークエラー
        console.error('ネットワークエラー: インターネット接続を確認してください');
      } else {
        // その他のエラー
        console.error('エラー:', error.message);
      }
      
      throw error;
    }
  }

  /**
   * 設定が正しいかチェックする
   */
  checkConfig(): void {
    console.log('🔍 設定をチェック中...');
    
    if (this.token === 'your_notion_token_here') {
      console.error('❌ NOTION_TOKENが設定されていません');
      console.log('📝 config.tsファイルでトークンを設定してください');
      return;
    }
    
    if (this.databaseId === 'your_database_id_here') {
      console.error('❌ DATABASE_IDが設定されていません');
      console.log('📝 config.tsファイルでデータベースIDを設定してください');
      return;
    }
    
    console.log('✅ 設定は正常です');
  }
} 