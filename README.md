#### install
    
    meteor create simple-todos

    meteor npm install --save react react-dom

#### Using data from a collection inside a React component

    meteor npm install --save react-addons-pure-render-mixin
    meteor add react-meteor-data

#### Adding user accounts

    meteor add accounts-ui accounts-password

#### Removing insecure

    meteor remove insecure

####  controlling which data Meteor sends to the client-side database.
    
    meteor remove autopublish

#### see the classnames NPM Package

    meteor npm install --save classnames

#### Testing

    meteor add practicalmeteor:mocha

#### 建立步驟

##### 資料庫建立 (imports/api/tasks.js)

        ＊建立資料庫
        ＊操作資料庫
        ＊發送資料
        ＊控制權限

##### 綁定資料庫 (server/main.js)

        ＊服務端資料庫綁定

##### UI 設定 (imports/ui)

        *App.jsx 主畫面設計
            ＊Task.jsx Todo 單一項目設計
            ＊AccountsUIWrapper.jsx 登入畫面設計 + 登入畫面設定檔 (startup/accounts-config.js)

##### Client 設計

        ＊main.js
            ＊綁定登入畫面設定檔
            ＊顯示 App.jsx 主畫面

        ＊main.html
            ＊靜態 html

        ＊main.css
            ＊css 設定

#### refs by 

    https://www.meteor.com/tutorials/react/creating-an-app