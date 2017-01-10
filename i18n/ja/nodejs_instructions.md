${app}: 始めに
-------------------------------------
これは、Node.js と Cloudant サービスのボイラープレート・アプリケーションです。

このサンプルは、お気に入り編成アプリケーションで、ユーザーはファイルを各種カテゴリーに編成して管理でき、一方でそれらのファイルはデータベースにバックグラウンドで保持されます。このアプリケーションは、さまざまなタイプのファイルのアップロードをサポートしています。このサンプルでは、cradle node.js API を使用して、アプリケーションにバインドされるデータベース・サービスにアクセスする方法を示します。

1. [cf コマンド・ライン・ツールをインストールします](${doc-url}/#starters/buildingweb.html#install_cf)。
2. [スターター・アプリケーション・パッケージをダウンロードします](${ace-url}/rest/apps/${app-guid}/starter-download)。
3. パッケージを解凍し、そのパッケージに 'cd' で移動します。
4. Bluemix への接続:

		cf api ${api-url}

5. Bluemix へのログイン:

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. アプリのデプロイ:

		cf push ${app} -c "node app.js" -m 512M

7. アプリへのアクセス: [${route}](http://${route})
