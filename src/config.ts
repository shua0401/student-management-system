/**
 * Notion APIの設定
 * 
 * 使い方：
 * 1. NOTION_TOKEN: Notionの設定画面で取得したトークン
 * 2. DATABASE_ID: データベースのURLから取得したID
 */

export const config = {
  // Notion API Token（環境変数から取得）
  NOTION_TOKEN: process.env.NOTION_TOKEN || '',
  
  // データベースID（環境変数から取得）
  DATABASE_ID: process.env.DATABASE_ID || '',
  
  // Notion APIのベースURL
  NOTION_API_URL: 'https://api.notion.com/v1'
}; 