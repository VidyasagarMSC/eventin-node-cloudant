Initiation à ${app}
-------------------------------------
Il s'agit d'une application de conteneur boilerplate pour Node.js avec le service Cloudant.

L'exemple est une application d'organisateur de favoris qui permet aux utilisateurs d'organiser et de gérer leurs fichiers dans
différentes catégories, ces
fichiers étant conservés dans la base de données en arrière-plan. Cette application prend en charge le téléchargement de fichiers de différents types. L'exemple
explique clairement comment accéder au service de base de données qui est lié à l'application à l'aide de l'API node.js cradle.


1. [Installez l'outil de ligne de commande cf](${doc-url}/#starters/buildingweb.html#install_cf).
2. [Téléchargez le package d'applications du module de démarrage](${ace-url}/rest/apps/${app-guid}/starter-download).
3. Procédez à l'extraction du package et placez-vous dans le répertoire du package à l'aide de la commande 'cd'. 
4. Accédez à Bluemix :

		cf api ${url-api}

5. Connectez-vous à Bluemix :

		cf login -u ${nom-utilisateur}
		cf target -o ${org} -s ${espace}
		
6. Déployez votre application :

		cf push ${app} -c "node app.js" -m 512M

7. Accédez à votre application : [${route}](http://${route})
