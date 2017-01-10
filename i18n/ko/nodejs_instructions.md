${app} 시작하기
-------------------------------------
Cloudant 서비스를 사용하는 Node.js용 보일러플레이트 애플리케이션입니다.

샘플은 Favorites Organizer 애플리케이션으로 백그라운드에서 데이터베이스에 파일이 유지되는 동안 사용자들이 다른 카테고리에서 이러한 파일을 구성하고 관리할 수 있습니다. 이 애플리케이션은 여러 다른 유형의 파일 업로드를 지원합니다. 샘플에서는 크래들 node.js API를 사용하여 애플리케이션에 바인딩하는 데이터베이스 서비스에 액세스하는 방법을 명확하게 보여줍니다. 

1. [cf 명령행 도구를 설치](${doc-url}/#starters/buildingweb.html#install_cf)하십시오.
2. [스타터 애플리케이션 패키지를 다운로드](${ace-url}/rest/apps/${app-guid}/starter-download)하십시오.
3. 패키지의 압축을 풀고 해당 위치로 'cd'하십시오.
4. Bluemix에 연결하십시오.

		cf api ${api-url}

5. Bluemix에 로그인하십시오.

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. 앱을 배치하십시오.

		cf push ${app} -c "node app.js" -m 512M

7. [${route}](http://${route})로 앱에 액세스하십시오.
