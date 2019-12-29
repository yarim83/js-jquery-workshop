## O Projekcie

![Screenshot](https://github.com/yarim83/js-jquery-workshop/blob/master/main/webapp/screens/js-jquery-workshop.png)

Projekt prostej witryny klienckiej REST do zarządzania książkami przy pomocy żądań Ajax. System komunikuje się z serwerem.


### Przygotowanie Serwera API
Należy pobrać paczkę:
* [Rest-API-Serwer](https://github.com/yarim83/js-jquery-workshop/tree/master/main/webapp) 

Następnie będąc w folderze projektu wykonać polecenie:
````
mvn install
````
Uruchomić projekt z wbudowanym serwerem:
````
mvn clean compile exec:java
````
W repozytorium znajduje się również plik ````jar````.

Serwer można również uruchomić za pomocą komendy:
````
java -jar nazwa_pliku.jar
````
### Zastosowane technologie
Ta sekcja przedstawia główne technologie wykorzystane w projekcie.
* [JQuery|Ajax|REST API](https://jquery.com/)
* [Maven](http://maven.apache.org/)
* [CSS](https://www.w3schools.com/)
* [Materialize](https://materializecss.com/)
