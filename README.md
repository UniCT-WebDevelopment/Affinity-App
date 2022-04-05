# AffinityApp


Il progetto realizzato consiste in una web application il cui scopo è quello di trovare persone affini a noi, con gli stessi interessi e passioni da condividere.
Il tutto è stato realizzato tramite il framework Laravel e la libreria React
E' stato utilizzato un database per l'interazione con i dati.

## Introduzione


Il progetto realizzato consiste in una web application il cui scopo è quello di trovare persone affini a noi, con gli stessi interessi e passioni da condividere.


## Struttura
L'applicazione è suddivisa in componenti, quali:

* Registrazione: 
interfaccia che consente all'utente di registrarsi;
* Login:
 interfaccia per effettuare il Login;
* Profilo:
 interfaccia che consente di modificare i dati del profilo;
* Interessi:
 interfaccia che permette all'utente di settare i propri interessi.
* Utenti:
 interfaccia che ospita la lista di tutti gli utenti filtrati in base agli interessii settati nell'apposita sezione. 

## Strumenti utilizzati

**Back-end**

Per quanto riguarda la parte back-end il tutto è stato realizzato mediante il framework Laravel.

**Front-end**

Per lo sviluppo dell'interfaccia utente è stata utilizzata la libreria React.
Per definire alcuni aspetti grafici della pagina è stata utilizzata la libreria Material-UI che consente di utilizzare diversi componenti predefiniti.

Per gestire i dati in un database è stata utilizzata la piattaforma XAMPP.

## Setup

Avviare il progetto seguendo i seguenti passaggi:
* Clonare il repository GIT
* Installare la piattaforma XAMPP/MAMPP
* Creare un Database chiamato "affinity"
* Creare le tabelle:
    * **users** con i campi name, email, phone, gender, età, password, città, provincia, foto, nickname, language;
    * **interest** con il campo name;
    * **interests_users** con i campi id_users, id_interest che conterrà gli interessi di ogni utente.
*  Modificare il file .env di esempio modificando i parametri di accesso al Database.
* Aprire il terminale e spostarsi dentro la cartella apiLaravel/example-app e lanciare i seguenti comandi:
    * install composer
    * php artisan serve

* Spostarsi dentro la cartella my-app e lanciare il comando:
    * npm install
* Aprire il browser e collegarsi all'url http://localhost:3000
---
Autore : Rita Sciuvra
