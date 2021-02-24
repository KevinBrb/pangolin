# Un carnet d'adresse pour pangolins !

Voici la seule plateforme au monde qui permet de réunir les pangolins du monde entier.
Grâce à cette application vous pourrez (une fois inscrit et connecté) : 

* Accéder à la liste de tous nos membres
* Voir leur descriptif complet
* Les demander en amis

Bienvenue chez PangoBook, n'attendez plus, inscrivez-vous !

## Technologies de l'application

Cette application est réalisé en MEAN (MongoDB, Express, Angular, NodeJS).

## Démarrage de l'application

Afin de pouvoir faire tourner cette application, il faut au préalable installer et configurer si nécessaire les outils suivants : 

* NodeJS et le manager de pacquet npm
* MongoDB

Il faudra aussi prévoir un fichier ".env" avec vos informations de connexion à votre base de donnée mongo, un fichier exemple est disponible dans ce dossier.

## Côté back

Cloner ce repo : 

```shell
git clone https://github.com/KevinBrb/pangolin.git
```

A la racine du dossier : 

```shell
npm install
```

Installer nodemon : 

```shell
npm install nodemon
```

Pour démarrer le server :

```shell
npm start
```

## Côté front

Se déplacer dans le dossier Angular :

```shell
cd .\pangolin-app\
```

Installation des paquets liés à Angular :

```shell
npm install
```

Démarrer l'application :

```shell
ng serve --open
```

## Quelques tests

J'ai mis en place quelques tests unitaires pour la forme ! Pour les lancer, exécuter cette commande :

```shell
npm run test
```