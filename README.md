
# BookManager

#### 読書が好きな、あなたのための備忘録
---

## アプリURL
https://book-manager-coral.vercel.app/
---
## 概要
　**Book Manager** は大量の蔵書や資料本を抱えている方向けの蔵書管理アプリです。
蔵書や購入したい本の備忘録として、蔵書のカテゴリ分類で記憶。
本情報の入力として ISBNコード手入力、もしはスキャン機能での取り込みに対応します。
---

## 作成背景

### 課題

 - 大量の蔵書の把握が難しい
持っている本が増えると、新たに買った本が既に持っていたとか、処分はしたけど読んだことがあったと気付くことがあるなど
無駄な購入が発生する   
 - 気になった本をチェックしておきたい
店先やネットで見かけて、気になった本を見つけて、とりあえずチェックはしておきたい時がある。

### 解決策

既に持っている本の状況（過去に処分したものを含む）と、これから欲しい本の情報をリスト化して管理する。
また、本情報の入力を簡易化するため、入力されたISBNコードから、本の情報を取得する機能を設ける。

---

## 開発期間

 - 開発期間　2025年 10月17日 ～ 11月22日
 - 合計時間　調査・検証を含め 100時間程度
------
## 設計資料

---
## 使用技術

### フロントエンド
 - Next.js 16.0.3
 - React 19.2.0
 - TypeScript
 - CSS Modules/Tailwindcss
 - testing-library / vitest (テスト)
 - Zxing Browser/Library (コードリーダー)

### インフラ・デプロイ
 - Vercel

### 開発ツール
 - Git/GitHub (バージョン管理)
---
## 実装済 機能

### 本情報リスト
<img width="614" height="929" alt="01" src="https://github.com/user-attachments/assets/70d5a9f3-6019-4def-a426-fbe89f6d7b5d" />

### 本情報登録
<img width="612" height="929" alt="02" src="https://github.com/user-attachments/assets/2adcee04-6ce0-4d8d-865a-dd7d52e4e45a" />

### 本情報スキャン
<img width="614" height="927" alt="04" src="https://github.com/user-attachments/assets/3e3465f0-801c-4e7e-89d5-2ad6903664bc" />

### 本情報編集/削除
<img width="614" height="929" alt="03" src="https://github.com/user-attachments/assets/e98f9a75-f797-45a7-8a6d-1602c17fe552" />

---

## 今後の実装予定
### UIの洗練化
 - 最低限のスタイリングしかしておらず、もっと洗練されたデザインをあてたい。
 - 確認ダイアログやキャプションなど使い勝手のよいガイドを追加したい。
### スキャナ機能
 - スキャナ機能の動作に不安定なところがあり（連続スキャンをすると本情報を返してこなくなる時がある）解消がのぞまれる。
### シリアライズ
 - 蔵書データのシリアライズ化、外部DBとの連携。

---

## ライセンス
##### このプロジェクトは MIT ライセンスで公開されています。

---
## 作成者
Akai Yugo
 - GitHub: @AkaiYugo2025a






