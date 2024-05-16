# コロカップ
## 開発環境
### 使用技術
- phaser.js
- vite

### セットアップ
``` git bash
cd workspace/koro-front
 git clone git@github.com:jyogi-web/koro-front.git
```

node.jsがインストールされていることを確認してください。  

```bash
❯ node -v
v18.13.0
```
インストールしている場合は、下記を参考に一旦アンインストールしてください。
https://www.curict.com/item/c6/c6a2674.html  
上記のバージョンが表示されない場合は、バージョンの切り替えができるツールを使用して、node.jsをインストールし、バージョンを合わせてください。  

https://github.com/coreybutler/nvm-windows/releases  
上記にアクセスし、nvm-setup.exeをダウンロードしてインストールしてください。  
インストール方法は以下の記事を参考にして下さい。  
https://qiita.com/ryome/items/f2a0bc2de007da30bbfd  


```bash
>nvm version
1.1.7
```
※数字はインストールされているバージョンによって異なります。
node.jsをインストールします。

```bash 
nvm install v18.13.0
Extracting...
Complete


Installation complete. If you want to use this version, type
nvm use v18.13.0
```
node.jsのバージョンがあることを確認してください。
```bash
node -v
v18.13.0
```

### パッケージのインストール
```bash
cd workspace/koro-front
npm install
```

### 開発サーバーの起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
```


### 拡張機能

## 参考
https://dev.classmethod.jp/articles/phaser-js-typescript-vite/  
https://rollupjs.org/configuration-options/#output-manualchunks

test




