Did you mean...? service
========================

Servicio que te dice si el término o frase buscada están en el diccionario. Si tiene algo parecido, desambigua con '¿Quisiste decir...?'.

Service which indicates if a term or sentence is included in the dictionary. If several results match, disambiguates with 'Did you mean...?'.


**Sentences:**

companyList = ["amazon", "apple", "atlas copco", "axa", "barilla group", "bombardier", "cisco", "e.on", "eads", "emerson", "honeywell", "ingersoll rand", "lufthansa", "microsoft", "netapp", "oliver wyman", "pwc", "roche", "schneider electric", "time warner"];


sentences = ["como es ", "que es lo positivo de ", "que es lo bueno de ", "que es lo negativo de ", "que es lo malo de "];		



Dependencies
============

We use 'Natural': https://github.com/NaturalNode/natural by  Chris Umbel, Rob Ellis, Russell Mull.

'Natural' algorithms used in this project:

- Jaro–Winkler string distance measuring algorithm.

- Levenshtein distances

- Dice's co-efficient	
