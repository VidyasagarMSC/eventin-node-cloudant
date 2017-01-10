Empiece a trabajar con ${app}
-------------------------------------
Esta es una aplicación de contenedor modelo para Node.js con el servicio Cloudant.

El ejemplo es una aplicación de organización de favoritos que permite a los usuarios organizar y gestionar sus archivos en distintas categorías, mientras dichos archivos se conservan en la base de datos en el proceso de fondo. Esta aplicación da soporte a la actualización de archivos de distintos tipos. En el ejemplo es muestra claramente cómo acceder al servicio de base de datos que enlaza con la aplicación mediante la API node.js. 

1. [Instale la herramienta de línea de mandatos cf](${doc-url}/#starters/buildingweb.html#install_cf).
2. [Descargue el paquete de aplicación de inicio](${ace-url}/rest/apps/${app-guid}/starter-download).
3. Extraiga el paquete y ejecute 'cd' para ir al mismo. 
4. Conéctese a Bluemix:

		cf api ${api-url}

5. Inicie la sesión en Bluemix:

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. Despliegue su app:

		cf push ${app} -c "node app.js" -m 512M

7. Acceda a la app: [${ruta}](http://${route})
