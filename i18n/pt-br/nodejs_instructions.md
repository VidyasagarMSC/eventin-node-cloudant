Introdução ao ${app}
-------------------------------------
Esse é um aplicativo de texto padrão Node.js com o serviço Cloudant.

A amostra é um aplicativo Organizador de favoritos que permite aos usuários organizar e gerenciar seus
arquivos em diferentes categorias, enquanto esses arquivos são persistidos no banco de dados no plano de fundo. Esse
aplicativo suporta o upload de arquivos de diferentes tipos. Na amostra, ele demonstra claramente como acessar o serviço
de banco de dados que se liga ao aplicativo usando a API node.js de base.

1. [Instale a ferramenta de linha de comandos cf](${doc-url}/#starters/buildingweb.html#install_cf).
2. [Faça o download do pacote de aplicativo iniciador](${ace-url}/rest/apps/${app-guid}/starter-download).
3. Extraia o pacote e 'cd' para ele.
4. Conecte-se ao Bluemix:

		cf api ${api-url}

5. Efetue login no Bluemix:

		cf login -u ${username}
		cf target -o ${org} -s ${space}
		
6. Implemente seu app:

		cf push ${app} -c "node app.js" -m 512M

7. Acesse seu app: [${route}](http://${route})
