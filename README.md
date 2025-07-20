# 学生管理システム

Notion APIを使用した学生管理システムです。Webフォームから学生情報を入力し、Notionデータベースに保存できます。

## 🌟 機能

- 学生情報の追加（名前、メールアドレス、メッセージ）
- Notionデータベースとの連携
- レスポンシブなWeb UI
- Vercelでの簡単デプロイ

## 🛠️ 技術スタック

- **TypeScript** - 型安全な開発
- **Express.js** - Webサーバー
- **Notion API** - データベース連携
- **HTML/CSS/JavaScript** - フロントエンド
- **Vercel** - ホスティング

## 🚀 クイックスタート

### 前提条件

- Node.js (v14以上)
- npm または yarn
- Notion API トークン
- Notion データベース ID

### 1. リポジトリをクローン

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### 2. 依存関係をインストール

```bash
npm install
```

### 3. 環境変数を設定

```bash
# env.exampleをコピーして.envファイルを作成
cp env.example .env
```

`.env`ファイルを編集して、実際の値を設定：

```env
NOTION_TOKEN=your_actual_notion_token_here
DATABASE_ID=your_actual_database_id_here
```

### 4. 開発サーバーを起動

```bash
npm run web
```

### 5. ブラウザでアクセス

http://localhost:3000 にアクセス

## 📋 セットアップ詳細

### Notion API トークンの取得

1. [Notion Developers](https://developers.notion.com/) にアクセス
2. 「New integration」をクリック
3. 統合名を入力（例：「学生管理システム」）
4. 生成されたトークンをコピー

### Notion データベースの作成

1. Notionで新しいページを作成
2. 「/database」と入力してデータベースを追加
3. 以下のプロパティを設定：
   - **Name** (Title) - 学生の名前
   - **Email** (Email) - メールアドレス
   - **Message** (Text) - メッセージ・備考
4. データベースのURLからIDを取得

### データベースIDの取得

データベースのURLが以下のような形式の場合：
```
https://www.notion.so/workspace/233fa76b-d3f8-807c-9547-c640acc98f8c?v=...
```

`233fa76b-d3f8-807c-9547-c640acc98f8c` の部分がデータベースIDです。

## 🌐 Vercelでのデプロイ

### 1. Vercel CLIをインストール

```bash
npm i -g vercel
```

### 2. Vercelにログイン

```bash
vercel login
```

### 3. プロジェクトをデプロイ

```bash
vercel
```

### 4. 環境変数を設定

Vercelダッシュボードで以下の環境変数を設定：

- `NOTION_TOKEN`: Notion API トークン
- `DATABASE_ID`: Notion データベース ID

### 5. 本番環境にデプロイ

```bash
vercel --prod
```

## 📁 プロジェクト構造

```
src/
├── server.ts          # メインのWebサーバー
├── notion.ts          # Notion APIクライアント
├── config.ts          # 設定ファイル
├── index.ts           # コンソールアプリケーション
├── checkDatabase.ts   # データベース確認ツール
├── listDatabases.ts   # データベース一覧表示
├── types/
│   └── index.ts       # TypeScript型定義
└── utils/
    ├── logger.ts      # ログ機能
    └── calculator.ts  # 計算機能
```

## 🔧 開発コマンド

```bash
# 開発サーバー起動
npm run web

# ビルド
npm run build

# 本番サーバー起動
npm start

# テスト実行
npm test
```

## 🌍 環境変数

| 変数名 | 説明 | 必須 |
|--------|------|------|
| `NOTION_TOKEN` | Notion API トークン | ✅ |
| `DATABASE_ID` | Notion データベース ID | ✅ |
| `PORT` | サーバーポート（デフォルト: 3000） | ❌ |

## 📡 API エンドポイント

- `GET /`: メインページ（学生追加フォーム）
- `POST /api/add-student`: 学生情報を追加

### リクエスト例

```bash
curl -X POST http://localhost:3000/api/add-student \
  -H "Content-Type: application/json" \
  -d '{
    "name": "田中太郎",
    "email": "tanaka@example.com",
    "message": "よろしくお願いします"
  }'
```

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 新しいブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は [LICENSE](LICENSE) ファイルを参照してください。

## 🆘 トラブルシューティング

### よくある問題

1. **環境変数が設定されていない**
   - `.env`ファイルが正しく作成されているか確認
   - 値が正しく設定されているか確認

2. **Notion APIエラー**
   - トークンが正しいか確認
   - データベースIDが正しいか確認
   - データベースの権限設定を確認

3. **ビルドエラー**
   - Node.jsのバージョンを確認（v14以上推奨）
   - 依存関係を再インストール：`npm install`

## 📞 サポート

問題が発生した場合は、[Issues](https://github.com/your-username/student-management-system/issues) で報告してください。
