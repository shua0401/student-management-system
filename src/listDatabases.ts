import axios from 'axios';
import { config } from './config';

async function listDatabases() {
  try {
    console.log('🔍 Notion APIでデータベース一覧を取得中...\n');
    
    const response = await axios.post(
      `${config.NOTION_API_URL}/search`,
      {
        filter: {
          value: 'database',
          property: 'object'
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${config.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ 利用可能なデータベース一覧:');
    console.log('=====================================');
    
    if (response.data.results.length === 0) {
      console.log('❌ アクセス可能なデータベースがありません');
      console.log('📝 NotionでIntegrationをデータベースに追加してください');
    } else {
      response.data.results.forEach((db: any, index: number) => {
        const titleProp = db.title && db.title[0] ? db.title[0].plain_text : 'Untitled';
        console.log(`${index + 1}. ${titleProp}`);
        console.log(`   ID: ${db.id}`);
        console.log('   ---');
      });
    }
    
    console.log(`\n📊 合計: ${response.data.results.length}個のデータベース`);
    
  } catch (error: any) {
    console.error('❌ データベース一覧取得エラー:');
    
    if (error.response) {
      console.error(`ステータス: ${error.response.status}`);
      console.error(`メッセージ: ${error.response.data.message || '不明なエラー'}`);
    } else if (error.request) {
      console.error('ネットワークエラー: インターネット接続を確認してください');
    } else {
      console.error('エラー:', error.message);
    }
  }
}

// プログラムを実行
listDatabases(); 