Einführung in ${app}
-------------------------------------
Dies ist eine Boilerplate-Anwendung für Node.js mit Cloudant-Service.

Bei dem Beispiel handelt es sich um eine Favorites Organizer-Anwendung, mit deren Hilfe Benutzer ihre Dateien in unterschiedlichen Kategorien organisieren und verwalten können; dabei werden diese Dateien dauerhaft in der Datenbank im Hintergrund gespeichert. Diese Anwendung unterstützt das Hochladen von Dateien unterschiedlicher Typen. In dem Beispiel sehr deutlich veranschaulicht, wie auf den Datenbankservice, der an die Anwendung gebunden wird, zugegriffen wird, und zwar mithilfe der Andock-API node.js.

1. [Das Befehlszeilentool 'cf' installieren](${doc-url}/#starters/buildingweb.html#install_cf).
2. [Das Starteranwendungspaket herunterladen](${ace-url}/rest/apps/${app-guid}/starter-download).
3. Das Paket extrahieren und in das entsprechende Verzeichnis ('cd') wechseln.
4. Verbindung zu Bluemix herstellen:

		cf api ${api-url}

5. Bei Bluemix anmelden:

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. Ihre Anwendung (App) bereitstellen:

		cf push ${app} -c "node app.js" -m 512M

7. Auf Ihre Anwendung (App) zugreifen: [${route}](http://${route})
