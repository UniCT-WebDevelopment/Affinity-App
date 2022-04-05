# AffinityApp
===

**Introduzione**
Il progetto realizzato consiste in una web application il cui scopo è quello di trovare persone affini a noi, con gli stessi interessi e passioni da condividere.

**Struttura**
L'applicazione è suddivisa in componenti, quali:

*Registrazione: interfaccia per consentire all'utente di registrarsi;
*Login: interfaccia per effettuare il Login;
*Profilo: interfaccia che consente di modificare i dati del profilo;
*Interessi: interfaccia che permette all'utente di settare i propri interessi.
*Utenti: interfaccia che ospita la lista di tutti gli utenti filtrati in base agli interessii settati nell'apposita sezione. 

**Strumenti utilizzati**

Back-end
Per quanto riguarda la parte back-end il tutto è stato realizzato mediante il framework Laravel.


Front-end
Per lo sviluppo dell'interfaccia utente è stata utilizzata la libreria React.

Per definire alcuni aspetti grafici della pagina è stata utilizzata la libreria Material-UI che consente di utilizzare diversi componenti.

Per gestire i dati in un database è stata utilizzata la piattaforma XAMPP

e' necessario inserire modificare i dati di accesso al database MySql all'interno nel file .env definendo

**Setup**

Avviare il progetto seguendo i seguenti passaggi:
* Clonare il repository GIT
* Installare la piattaforma XAMPP/MAMPP
* Creare un Database chiamato "affinity"
*  Modificare il file .env di esempio modificando i parametri di accesso al Database.
* Aprire il terminale e spostarsi dentro la cartella apiLaravel/example-app e lanciare i comandi:
    * install composer
    * php artisan serve

* Spostarsi dentro la cartella my-app e lanciare il comando:
    * npm install
* Aprire il browser e collegarsi all'url http://localhost:3000






