Introduzione a ${app}
-------------------------------------
Applicazione di contenitore tipo per Node.js con il servizio Cloudant.

L'esempio è un'applicazione Favorites Organizer, che consente agli utenti di organizzare e gestire i propri file in diverse categorie, finché tali file sono mantenuti nel database in background. Questa applicazione supporta il caricamento di file di diversi tipi. Nell'esempio viene mostrato chiaramente come accedere al servizio di database che viene collegato all'applicazione utilizzando la API node.js di base.

1. [Installare lo strumento della riga di comando cf](${doc-url}/#starters/buildingweb.html#install_cf).
2. [Scaricare il package applicazione starter](${ace-url}/rest/apps/${app-guid}/starter-download).
3. Estrarre il package e il 'cd' in esso.
4. Connetti a Bluemix:

		cf api ${api-url}

5. Accedi a Bluemix:

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. Distribuisci la applicazione:

		cf push ${app} -c "node app.js" -m 512M

7. Accedi alla applicazione: [${route}](http://${route})
