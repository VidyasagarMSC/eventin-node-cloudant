開始使用 ${app}
-------------------------------------
這是適用於 Node.js 的樣板應用程式，搭配 Cloudant 服務。

範例為 Favorites Organizer 應用程式，其可讓使用者以不同種類組織及管理檔案，同時那些檔案會在背景中持續保存至資料庫。此應用程式支援上傳不同類型的檔案。在範例中，其會清楚地示範如何使用基座 node.js API，存取連結至應用程式的資料庫服務。

1. [安裝 cf 指令行工具](${doc-url}/#starters/buildingweb.html#install_cf)。
2. [下載入門範本應用程式套件](${ace-url}/rest/apps/${app-guid}/starter-download)。
3. 且解開套件並 'cd' 至其中。
4. 連接至 Bluemix：

		cf api ${api-url}

5. 登入 Bluemix：

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. 部署您的應用程式：

		cf push ${app} -c "node app.js" -m 512M

7. 存取您的應用程式：[${route}](http://${route})
