import express from 'express';
import cors from 'cors';
import { NotionClient } from './notion';

const app = express();
const port = process.env.PORT || 3000;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Notionクライアントの初期化
const notion = new NotionClient();

// ルートページ（HTMLフォーム）
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="ja">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>学生管理システム</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 30px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #555;
            }
            input, textarea {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
                box-sizing: border-box;
            }
            textarea {
                height: 100px;
                resize: vertical;
            }
            button {
                background-color: #007bff;
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                width: 100%;
            }
            button:hover {
                background-color: #0056b3;
            }
            button:disabled {
                background-color: #ccc;
                cursor: not-allowed;
            }
            .message {
                padding: 10px;
                margin: 10px 0;
                border-radius: 5px;
                text-align: center;
            }
            .success {
                background-color: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            .error {
                background-color: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            .loading {
                background-color: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎓 学生管理システム</h1>
            
            <div id="message"></div>
            
            <form id="studentForm">
                <div class="form-group">
                    <label for="name">名前 *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">メールアドレス *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="message">メッセージ・備考</label>
                    <textarea id="message" name="message" placeholder="備考やメッセージを入力してください"></textarea>
                </div>
                
                <button type="submit" id="submitBtn">📝 学生を追加</button>
            </form>
        </div>

        <script>
            const form = document.getElementById('studentForm');
            const messageDiv = document.getElementById('message');
            const submitBtn = document.getElementById('submitBtn');

            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // フォームデータを取得
                const formData = new FormData(form);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    message: formData.get('message') || ''
                };

                // ボタンを無効化
                submitBtn.disabled = true;
                submitBtn.textContent = '追加中...';

                // メッセージを表示
                showMessage('データを追加中です...', 'loading');

                try {
                    const response = await fetch('/api/add-student', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();

                    if (response.ok) {
                        showMessage('✅ 学生の追加が完了しました！', 'success');
                        form.reset(); // フォームをリセット
                    } else {
                        showMessage('❌ エラーが発生しました: ' + result.error, 'error');
                    }
                } catch (error) {
                    showMessage('❌ ネットワークエラーが発生しました', 'error');
                } finally {
                    // ボタンを有効化
                    submitBtn.disabled = false;
                    submitBtn.textContent = '📝 学生を追加';
                }
            });

            function showMessage(text, type) {
                messageDiv.innerHTML = '<div class="message ' + type + '">' + text + '</div>';
                
                // 3秒後にメッセージを消す（成功時のみ）
                if (type === 'success') {
                    setTimeout(() => {
                        messageDiv.innerHTML = '';
                    }, 3000);
                }
            }
        </script>
    </body>
    </html>
  `);
});

// APIエンドポイント：学生追加
app.post('/api/add-student', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // バリデーション
    if (!name || !email) {
      return res.status(400).json({ error: '名前とメールアドレスは必須です' });
    }

    // Notionにデータを追加
    await notion.addRow(name, email, message || '');

    res.json({ success: true, message: '学生が正常に追加されました' });
  } catch (error: any) {
    console.error('APIエラー:', error);
    res.status(500).json({ 
      error: error.response?.data?.message || error.message || '不明なエラーが発生しました' 
    });
  }
});

// サーバー起動
app.listen(port, () => {
  console.log(`🚀 Webサーバーが起動しました: http://localhost:${port}`);
  console.log(`📝 ブラウザで http://localhost:${port} にアクセスしてください`);
}); 