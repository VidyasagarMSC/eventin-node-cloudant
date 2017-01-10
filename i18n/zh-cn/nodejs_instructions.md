${app} 入门
-------------------------------------
这是带 Cloudant 服务的 Node.js 的样板应用程序。

样本为 Favorites Organizer 应用程序，此应用程序允许用户在不同类别中组织和管理其文件，而这些文件在后台持久存储到数据库。此应用程序支持上载不同类型的文件。在样本中，明确演示了如何使用 cradle node.js API 访问绑定到应用程序的数据库服务。

1. [安装 cf 命令行工具](${doc-url}/#starters/buildingweb.html#install_cf)。
2. [下载起动器应用程序包](${ace-url}/rest/apps/${app-guid}/starter-download)。
3. 解压缩程序包，并对其执行“cd”命令以切换到相应目录。
4. 连接到 Bluemix：

		cf api ${api-url}

5. 登录到 Bluemix：

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. 部署您的应用程序：

		cf push ${app} -c "node app.js" -m 512M

7. 访问您的应用程序：[${route}](http://${route})
