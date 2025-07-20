import axios from 'axios';
import { config } from './config';

async function checkDatabase() {
  const databaseId = '233fa76b-d3f8-807c-9547-c640acc98f8c';
  
  try {
    console.log('🔍 データベースの詳細を確認中...\n');
    
    const response = await axios.get(
      `${config.NOTION_API_URL}/databases/${databaseId}`,
      {
        headers: {
          'Authorization': `Bearer ${config.NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json'
        }
      }
    );

    const database = response.data;
    
    console.log('✅ データベース情報:');
    console.log('=====================================');
    
    // タイトルを取得
    const title = database.title && database.title[0] 
      ? database.title[0].plain_text 
      : 'タイトルなし';
    
    console.log(`📝 タイトル: ${title}`);
    console.log(`🆔 ID: ${database.id}`);
    console.log(`📅 作成日: ${database.created_time}`);
    console.log(`🔄 更新日: ${database.last_edited_time}`);
    
    // プロパティ（カラム）一覧
    console.log('\n📊 プロパティ（カラム）一覧:');
    console.log('=====================================');
    
    Object.entries(database.properties).forEach(([name, prop]: [string, any]) => {
      console.log(`- ${name} (${prop.type})`);
    });
    
  } catch (error: any) {
    console.error('❌ データベース情報取得エラー:');
    
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
checkDatabase(); 