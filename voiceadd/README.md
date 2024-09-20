# 音声からカルテを自動生成するアプリケーション

## 概要

このプロジェクトは、音声を録音して OpenAI の API を使用し、患者のカルテを自動生成する Web アプリケーションです。医療現場でのカルテ作成を効率化し、医師の負担を軽減することを目的としています。

## 主な機能

- **音声の録音と保存**
- **音声データのテキスト変換（トランスクリプション）**
- **初診・再診に対応したカルテの自動生成**
- **カルテの表示、コピー、クリア機能**
- **システムプロンプトや OpenAI API キーの設定編集機能**

## 動作環境

- [nvmを使用してNode.jsをインストールする](https://qiita.com/ymzkjpx/items/9658709eb51a23121098)
- **Node.js**（推奨バージョン 14 以上）
- **npm** または **yarn**
- **MUI** を使用しています
- **Google Chrome** を推奨します（UIおよびSafariとの互換性の問題があるため）

## OpenAI API キーの取得

- [OpenAI API キーの取得方法](https://platform.openai.com/docs/api-reference/introduction)
- [最新のAPIキー取得方法と注意事項](https://qiita.com/kurata04/items/a10bdc44cc0d1e62dad3)

## インストール手順

### 1. リポジトリのクローン


bash
git clone https://github.com/Lorhlona/voicekarte.git
cd voicekarte


または、[ZIPでダウンロード](https://github.com/Lorhlona/voicekarte/archive/refs/heads/main.zip)して解凍します。

### 2. 依存関係のインストール

プロジェクトフォルダ内で以下のコマンドを実行します。

```bash
npm install
```

または

```bash
yarn install
```

bash
npm update

bash
npx npm-check-updates -u
npm install


## 起動方法

### 1. 開発サーバーを起動します

bash
npm run dev

bash
yarn dev


### 2. ブラウザでアクセス

[http://localhost:3000](http://localhost:3000) にアクセスして、アプリケーションを確認してください。chrome推奨です。

## 使い方

1. **録音開始**
    - 「録音開始」ボタンをクリックし、患者の症状や状態を話してください。

2. **録音停止**
    - 録音が完了したら「録音停止」ボタンをクリックします。

3. **音声ファイルのアップロード**
    - 「ファイルアップロード」ボタンをクリックして、任意の音声ファイル（例：iPhoneのボイスレコードで作成したm4aファイルなど）を選択してください。

4. **カルテ作成**
    - 初診の場合：「初診カルテ作成」ボタンをクリック
    - 再診の場合：「再診カルテ作成」ボタンをクリック
    - 録音またはアップロードした音声がテキストに変換され、OpenAI API を使用してカルテが自動生成されます。

5. **カルテの操作**
    - **コピー**：「コピー」ボタンで生成されたカルテをクリップボードにコピーできます。
    - **クリア**：「クリア」ボタンで音声データやカルテ内容をリセットします。患者さんのデータはPC上に残りません。

6. **設定変更**
    - 「設定」ボタンから以下の設定が行えます。
        - 初診カルテシステムプロンプト編集：普段の診療録を例示すると、より正確なカルテが生成されます。
        - 再診カルテシステムプロンプト編集：普段の診療録を例示すると、より正確なカルテが生成されます。
        - OpenAI APIキー設定

7. **終了**
    - 終了する際は、「終了」ボタンを押してサーバーを停止してください。その後、ウィンドウとターミナルを閉じてください。

## 注意事項

- **OpenAI API キーの管理**：API キーは個人情報です。第三者に共有しないようご注意ください。
- **API 利用料金**：OpenAI API の利用には料金が発生します。事前に料金体系をご確認ください。
- **動作確認**：本アプリケーションはローカル環境での動作を前提としています。サーバー環境での利用には追加の設定が必要になる場合があります。

## ライセンス

このプロジェクトは [MIT ライセンス](./LICENSE) のもとで公開されています。

## 開発者向け情報

### ディレクトリ構成

- `/components`：React コンポーネント
- `/pages/api`：API エンドポイント
- `/utils`：ユーティリティ関数
- `/hooks`：カスタムフック
- `/config`：設定ファイル

### 主なファイル

- `components/medical-chart-app.tsx`：メインのアプリケーションコンポーネント
- `utils/api.ts`：API 呼び出し用の関数
- `pages/api/uploadAudio.ts`：音声アップロード用の API エンドポイント
- `pages/api/generateRecord.ts`：カルテ生成用の API エンドポイント

### コントリビューション

バグの報告や機能の提案は [Issues](https://github.com/Lorhlona/voicekarte/issues) や [Pull Requests](https://github.com/Lorhlona/voicekarte/pulls) を通じて受け付けています。ご協力よろしくお願いいたします。

X：ロナ先生　@LonaPsycho

---

### LICENSE
markdown:voiceadd/LICENSE
MIT License
Copyright (c) 2024 Lorhlona