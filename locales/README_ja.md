<div align="center">

  <img src="../assets/icon.jpg" alt="Markdown Viewer Logo" width="100" />

  <h1>Markdown Viewer - ライブプレビュー付きオンライン Markdown エディター</h1>

  **ブラウザーで使える Markdown エディター、ビューアー、プレビューアー、リーダーです。**

  *`.md` ファイルを開き、読み、編集し、分割画面のライブ Markdown プレビュー、同期スクロール、GitHub-Flavored Markdown、図表、地図、3D STL プレビュー、ABC 記譜再生、PDF/HTML/PNG エクスポート、Web/デスクトップ/Docker のマルチタブ作業に対応します。*

  [![License](https://img.shields.io/github/license/ThisIs-Developer/Markdown-Viewer?style=flat-square&color=red)](https://github.com/ThisIs-Developer/Markdown-Viewer/blob/main/LICENSE)
  [![Latest Release](https://img.shields.io/github/v/release/ThisIs-Developer/Markdown-Viewer?style=flat-square&color=FF6B00)](https://github.com/ThisIs-Developer/Markdown-Viewer/releases)
  [![Last Commit](https://img.shields.io/github/last-commit/ThisIs-Developer/Markdown-Viewer?style=flat-square)](https://github.com/ThisIs-Developer/Markdown-Viewer/commits/main)
  [![Stars](https://img.shields.io/github/stars/ThisIs-Developer/Markdown-Viewer?style=flat-square&color=dfb317)](https://github.com/ThisIs-Developer/Markdown-Viewer/stargazers)

  <p>
    <a href="https://codewiki.google/github.com/thisis-developer/markdown-viewer" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/CodeWiki-Explore-4285F4?logo=wikipedia&logoColor=white&style=flat" alt="CodeWiki" />
    </a>
    <a href="https://deepwiki.com/ThisIs-Developer/Markdown-Viewer" target="_blank" rel="noopener noreferrer">
      <img src="https://deepwiki.com/badge.svg" alt="DeepWiki" />
    </a>
  </p>

  🌐 [English](../README.md) • [简体中文](README_zh.md) • **日本語** • [한국어](README_ko.md) • <a href="../wiki/Localization.md">その他の言語</a>

  [ライブデモ](https://markdownviewer.pages.dev/) • [Wiki](../wiki/Home.md#start-here) • [Issue Tracker](https://github.com/ThisIs-Developer/Markdown-Viewer/issues) • [Releases](https://github.com/ThisIs-Developer/Markdown-Viewer/releases)

</div>

## 目次

<details>
  <summary>📂 <b>目次</b>（クリックして展開）</summary>
  <br />

  - [プロジェクト概要](#プロジェクト概要)
  - [すぐに試す](#すぐに試す)
  - [主な機能](#主な機能)
  - [Markdown 編集とライブプレビュー](#markdown-編集とライブプレビュー)
  - [図表とビジュアルコンテンツ](#図表とビジュアルコンテンツ)
  - [共有、共同編集、エクスポート](#共有共同編集エクスポート)
  - [システム構成](#システム構成)
    - [主要ファイル](#主要ファイル)
  - [開始方法とインストール](#開始方法とインストール)
  - [使い方とキーボードショートカット](#使い方とキーボードショートカット)
  - [プロジェクトディレクトリ構成](#プロジェクトディレクトリ構成)
  - [Built With（技術スタック）](#built-with技術スタック)
  - [プライバシー](#プライバシー)
  - [コントリビューションとコード品質](#コントリビューションとコード品質)
  - [ショーケースとコミュニティプロジェクト](#ショーケースとコミュニティプロジェクト)
  - [コントリビューター](#コントリビューター)
  - [📈 開発の歩み](#-開発の歩み)
  - [ライセンス](#ライセンス)
  - [連絡先とサポート](#連絡先とサポート)
</details>

---

## プロジェクト概要

**Markdown Viewer** は、`.md` と `.markdown` ファイル向けのオープンソースのブラウザー型 Markdown エディター兼ビューアーです。プレーンテキスト Markdown 編集、GitHub 風ライブプレビュー、文書タブ、diagram-as-code、数式、エクスポート、共有、Web/デスクトップ展開をまとめて扱えます。

多くの編集、プレビュー、自動保存、ローカルファイルの読み込み、設定、エクスポートは利用者の端末上で行われます。ネットワークを使う機能は明示されています。ログインは不要です。

<p align="center">
  <img src="https://github.com/user-attachments/assets/ccfd7772-8874-4470-9282-7b0327a87bbd" alt="Markdown Viewer - GFM レンダリング、複数文書タブワークスペース、ダークテーマに対応した分割画面ライブ Markdown エディターとプレビュー" width="90%" />
</p>

## すぐに試す

1. [オンライン Markdown エディター](https://markdownviewer.pages.dev/) を開きます。
2. `.md` または `.markdown` ファイルをドラッグするか、そのまま書き始めます。
3. 必要に応じてライブプレビュー、**Review**、**Insert Diagram & More**、エクスポート、Share Snapshot、Live Share を使います。

詳しくは Wiki の [機能](../wiki/Features.md#product-summary)、[プライバシー](../wiki/Home.md#privacy-at-a-glance)、[共有](../wiki/Features.md#share-markdown-with-snapshot-links)、[エクスポート](../wiki/Features.md#export-markdown-to-pdf-html-png-and-md)、[デスクトップ](../wiki/Features.md#desktop-app) を参照してください。

## 主な機能

Markdown Viewer は基本的な Markdown 機能に加え、技術文書をより豊かに作るための機能を備えています。

1. **GitHub-Flavored Markdown (GFM)**: 通常の Markdown を書きながら、表、タスクリスト、取り消し線、自動リンク、コードブロック、アラート、脚注、ライブプレビューを利用できます。多くの Markdown エディターは基本機能を備えていますが、以下の機能は Markdown Viewer がより豊かな技術文書のために追加しているものです。
2. **Advanced Diagram Support & More**: 1 つの **Insert Diagram & More** ボタンから、ビジュアルテンプレート、プレビュー、挿入できるサンプルを開けるため、すべての構文を覚えなくても複雑なコンテンツを追加できます。

   - **Mermaid**: フローチャート、シーケンス図、ガントチャート、状態図、ドキュメント向けのアーキテクチャ可視化を作成できます。
   - **PlantUML**: ソフトウェア設計メモ向けに、シーケンス図、クラス図、ユースケース図、エンジニアリング図を追加できます。
   - **Graphviz**: ツリー、依存関係マップ、ネットワーク関係のための DOT グラフをレンダリングできます。
   - **D2**: モダンなレイアウト出力で、読みやすい diagram-as-code を作成できます。
   - **Vega-Lite**: Markdown の中でチャートやデータ可視化を直接記述できます。
   - **Markmap**: ネストした Markdown リストを、計画や学習メモ向けのマインドマップに変換できます。
   - **WaveDrom**: ハードウェアやプロトコル作業向けに、タイミング図と信号波形を記録できます。
   - **Map**: 文書を離れずに GeoJSON と TopoJSON データをプレビューできます。
   - **STL 3D Model Renderer**: 技術メモと一緒に 3D モデルをプレビュー。
   - **ABC Music Player & Sheet Music Viewer**: 楽譜レンダリングとブラウザー再生。

3. **Comments & Suggestions**: Markdown ソースを変更せずに、レンダリング済みの文書ブロックへフィードバックを追加し、管理、解決できます。
4. **Live Share Temporary Rooms**: 編集可能または閲覧専用のアクセスモードを使って、短時間の編集セッション、レビュー、ペアライティングをリアルタイムに行えます。
5. **Share Snapshot Links**: 文書の状態をすばやく送る必要があるときに、読み取り専用または編集可能な時点リンクを作成できます。
6. **LaTeX Math Notation**: MathJax でインライン数式と表示数式をレンダリングでき、数式の多いメモ、論文、技術説明に便利です。
7. **Markdown to PDF, HTML & PNG Export**: 共有、印刷、アーカイブが必要な文書向けに、Markdown、HTML、PNG、Browser Print / Save as PDF、Legacy Raster PDF をエクスポートできます。

詳細、制限、プライバシーについては [機能リファレンス](../wiki/Features.md#product-summary) を参照してください。

## Markdown 編集とライブプレビュー

- プレーン Markdown を書きながら、GFM、シンタックスハイライト、数式、アラート、脚注、表、タスクリスト、サニタイズ済み HTML をライブプレビューできます。
- 複数の Markdown 文書をタブで扱い、タブの名前変更や複製、ローカル Markdown ファイルのインポート、通常の作業状態のブラウザー保存ができます。
- WYSIWYG 風ツールバーで入力を補助しつつ、Markdown ソースはそのまま管理できます。
- 大きな文書はデバウンス処理とバックグラウンド Worker でプレビューし、入力の応答性を保ちます。

## 図表とビジュアルコンテンツ

Markdown Viewer は、技術メモ、ドキュメント、ハードウェア記事、音楽スニペット、データ中心の文書に使える Markdown 図表エディターとしても役立ちます。

- **Mermaid、PlantUML、Graphviz / DOT、D2**: フローチャート、シーケンス図、クラス図、アーキテクチャスケッチ、依存関係グラフ、diagram-as-code ワークフロー向け。
- **Vega-Lite、Markmap**: Markdown チャート、データ可視化、マインドマップ向け。
- **WaveDrom**: タイミング図と信号ドキュメント向け。
- **GeoJSON、TopoJSON マップ**: 位置情報を含む Markdown 文書向け。
- **STL 3D モデルプレビュー**: メモと並べて 3D モデルスニペットを確認する用途向け。
- **ABC 記譜**: 楽譜レンダリングとブラウザー再生向け。

<p align="center">
  <img src="https://github.com/user-attachments/assets/15c87e8c-43f0-4a4f-a4d7-81e98ba5c1cb" alt="図表サポートとその他の機能" width="90%" />
  <img src="https://github.com/user-attachments/assets/4341040b-eddd-40fa-8d1f-ba6ec9ac1010" alt="ABC 音楽記譜と音声合成" width="90%" />
  <img src="https://github.com/user-attachments/assets/606b1666-7359-4872-bb98-e3ae37b65ca9" alt="STL 3D モデルレンダラー" width="90%" />
</p>

## 共有、共同編集、エクスポート

- **Comments & Suggestions** は、Markdown を変更せずに表、見出し、段落、コードブロック、図へレビュー用フィードバックを追加します。通常のタブに保存され、アクティブな Live Share ルームでのみ同期されます。
- **Share Snapshot** は、時点 Markdown 共有用のすばやいリンクを作成します。小さな文書は URL hash に保持でき、より大きなスナップショットは、そのバックエンドが構成されている場合に一時的な Cloudflare KV ストレージを使用します。
<p align="center">
  <img src="https://github.com/user-attachments/assets/e62ca1a0-011a-4b01-90f9-e72638b9a6d5" alt="Share Snapshot" width="90%" />
</p>

- **Live Share rooms** は Cloudflare Durable Objects を使った一時的な共同編集機能で、編集可能な共同作業または閲覧専用レビューのアクセスモードがあります。レビューやペアライティングに便利ですが、エンドツーエンド暗号化ではありません。
<p align="center">
  <img src="https://github.com/user-attachments/assets/4d7a72c7-8eec-48df-9f66-49fe9f205d4f" alt="Live Share rooms" width="90%" />
</p>

- **Markdown export** は元の `.md` 文書をダウンロードします。
- **HTML export** は単体で開けるレンダリング済み文書を作成します。
- **PDF export** はブラウザー印刷/Save as PDF と Legacy Raster PDF に対応します。
- **PNG export** はレンダリング済みプレビューを画像として保存します。

---

## システム構成

Markdown Viewer はクライアント側のシングルページアプリです。`script.js` が UI を制御し、`preview-worker.js` が Markdown をバックグラウンドでコンパイルし、`sw.js` がオフライン対応キャッシュを扱います。

### 主要ファイル

1. **`index.html`**: アプリのレイアウトとスクリプト/スタイルの入口。
2. **`script.js`**: タブ、編集状態、プレビュー更新、インポート、エクスポート、共有、UI 動作。
3. **`styles.css`**: レイアウト、テーマ、プレビュー、印刷スタイル。
4. **`preview-worker.js`**: Markdown 解析とシンタックスハイライト。
5. **`sw.js`**: オフライン対応のアセットキャッシュ。

---

## 開始方法とインストール

### 💻 方法 1: ローカルですぐに実行（インストール不要）

`index.html` を `file://` で直接開くのではなく、ローカル HTTP サーバー経由で実行してください。

1. リポジトリをクローンまたはダウンロードします。
2. リポジトリフォルダーでターミナルを開きます。
3. `python -m http.server 8080` または `npx serve . -p 8080` を実行します。
4. ブラウザーで **[http://localhost:8080](http://localhost:8080)** を開きます。

---

### 🐳 方法 2: Docker コンテナー

コンテナーでアプリを実行します。

**事前ビルド済み Docker イメージ（GHCR）:**
```bash
docker run -d \
  --name markdown-viewer \
  -p 8080:80 \
  --restart unless-stopped \
  ghcr.io/thisis-developer/markdown-viewer:latest
```

ブラウザーで **[http://localhost:8080](http://localhost:8080)** を開きます。

**ローカル Docker Compose ビルド:**
```bash
git clone https://github.com/ThisIs-Developer/Markdown-Viewer.git
cd Markdown-Viewer
docker compose up -d
```
ブラウザーで **[http://localhost:8080](http://localhost:8080)** を開きます。

---

### 🖥️ 方法 3: デスクトップアプリのビルド

ソースから Neutralinojs デスクトップアプリをビルドします。

1. リポジトリをクローンし、`desktop-app/` ディレクトリへ移動します。
   ```bash
   cd desktop-app
   ```
2. インストール、準備、ビルドコマンドを実行します。
   ```powershell
   # node 依存関係をインストールし、Neutralino バイナリをダウンロード
   npm install
   node setup-binaries.js

   # リソースをメイン Web アプリと同期
   node prepare.js

   # リリースアプリをビルド/コンパイル
   npm run build
   ```

ビルド済みバイナリは [Releases](https://github.com/ThisIs-Developer/Markdown-Viewer/releases) から入手できます。

---

## 使い方とキーボードショートカット

ワークフロー、編集操作、エクスポート、共有、ショートカットは [使い方ガイド](../wiki/Usage-Guide.md#workspace-layout-for-editing-and-previewing-markdown) を参照してください。

---

## プロジェクトディレクトリ構成

```text
Markdown-Viewer/
+-- index.html              # Main web app shell
+-- script.js               # App logic and UI controller
+-- styles.css              # App and preview styles
+-- preview-worker.js       # Markdown preview worker
+-- sw.js                   # Service worker cache behavior
+-- assets/                 # App images and icons
+-- functions/              # Cloudflare Pages Functions
+-- workers/                # Live Share Worker source
+-- desktop-app/            # Neutralinojs desktop build
+-- locales/                # Localized README summaries
+-- wiki/                   # Project documentation
+-- Dockerfile              # Docker image setup
+-- docker-compose.yml      # Local container run config
+-- wrangler.toml           # Cloudflare deployment config
+-- README.md               # Main project overview
+-- CHANGELOG.md            # Release history
+-- LICENSE                 # Apache License 2.0
```

---

## Built With（技術スタック）

<p align="left">
  <a href="https://developer.mozilla.org/ja/docs/Web/HTML"><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" /></a>
  <a href="https://developer.mozilla.org/ja/docs/Web/CSS"><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" /></a>
  <a href="https://developer.mozilla.org/ja/docs/Web/JavaScript"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" /></a>
  <a href="https://getbootstrap.com"><img src="https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white" alt="Bootstrap" /></a>
  <a href="https://neutralino.js.org"><img src="https://img.shields.io/badge/NeutralinoJS-FFA500?style=flat-square&logo=neutralinojs&logoColor=white" alt="NeutralinoJS" /></a>
</p>

主な技術スタック: HTML、CSS、JavaScript、Bootstrap、Bootstrap Icons、Neutralinojs、Marked.js、Highlight.js、DOMPurify、MathJax、Mermaid、Leaflet、Three.js、ABCJS、Markmap、Yjs、jsPDF、html2canvas、Cloudflare Pages/Workers。

依存関係の読み込み、CDN 利用、デスクトップ用ローカルライブラリについては [client library notes](../wiki/Configuration.md#client-libraries) を参照してください。

一部の高度な図表エンジンは PlantUML、Kroki、mermaid.ink などのリモートレンダラーを使います。挙動とプライバシーの詳細は [diagram renderer notes](../wiki/Features.md#insert-diagrams-charts-maps-models-and-music) を参照してください。

---

## プライバシー

Markdown Viewer はクラウドワークスペースではありません。通常の入力、プレビュー、ローカルファイル読み込み、タブの自動保存、テーマ設定、多くのエクスポートは端末上で行われます。ログインは不要で、分析、テレメトリ、広告、追跡 Cookie は実装していません。

ネットワーク利用は GitHub インポート、リモート図表レンダラー、Share Snapshot、Live Share、CDN ライブラリ、外部文書リソースなど、ユーザーが使う機能に限られます。詳細は [data handling summary](../wiki/Features.md#data-handling-summary) を参照してください。

---

## コントリビューションとコード品質

コミュニティからの貢献を歓迎します。Pull Request を作成する前に [contributing before changing code](../wiki/Contributing.md#before-changing-code) を確認してください。

### コアワークフロー概要:
1. **Fork** して機能ブランチを作成します（`git checkout -b feature/your-feature`）。
2. **コードスタイルを確認:** HTML、CSS、JS ファイル全体で、きれいな 2 スペースインデントを維持してください。生の HTML 構造はセマンティックにしてください。処理 Worker 内で直接 DOM クエリを行うことは避けてください。
3. **Conventional Commits:** `feat:`、`fix:`、`docs:`、`style:`、`refactor:`、`perf:`、`chore:` のいずれかを付けた明確なコミットメッセージを書いてください。
4. **テスト:** Chrome、Firefox、Edge、Safari の各ビューポートで変更をテストしてください。

---

## ショーケースとコミュニティプロジェクト

*   **[Markdown Desk](https://github.com/jhrepo/markdown-desk):** Tauri で作られたネイティブ macOS ラッパーで、ネイティブファイルシステムハンドラー、メニューバー統合、自動リロード機能を追加します。

---

## コントリビューター

Markdown Viewer に貢献してくださったすべての方に感謝します。

<a href="https://github.com/ThisIs-Developer/Markdown-Viewer/graphs/contributors" target="_blank" rel="noopener noreferrer">
  <img src="https://contrib.rocks/image?repo=ThisIs-Developer/Markdown-Viewer" alt="Contributors" />
</a>

---

## 📈 開発の歩み

Markdown Viewer は PC 上の小さな個人プロジェクトとして始まりました。好奇心、失敗、修正、そして多くの思いやりから作られた、シンプルな Markdown ビューアーでした。<a href="https://a1b91221.markdownviewer.pages.dev/" target="_blank" rel="noopener noreferrer">最初のバージョン</a> は今もオンラインで、このプロジェクトの原点として残っています。

現在の <a href="https://markdownviewer.pages.dev/" target="_blank" rel="noopener noreferrer">Markdown Viewer</a> は、コミュニティからのフィードバック、Issue、PR、スクリーンショット、GIF、提案、実際の文書作成ワークフローを通じて育ちました。技術的な進歩も大切ですが、この歩みには感情的な側面もあります。多くの人が、このアプリを現在の姿に形作る手助けをしてくれました。

---

## ライセンス

このプロジェクトは Apache License 2.0 のもとで公開されています。完全な条項と条件については [LICENSE](../LICENSE) を参照してください。

---

## 連絡先とサポート

開発と保守: **[ThisIs-Developer](https://github.com/ThisIs-Developer)**

*   **バグ報告と要望:** [Issue を送信](https://github.com/ThisIs-Developer/Markdown-Viewer/issues)
*   **ドキュメント:** [Wiki start here](../wiki/Home.md#start-here)
