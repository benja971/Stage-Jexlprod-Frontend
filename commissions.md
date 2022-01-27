mandat simple => tout le monde peut vendre la maison
mandat semi exclusif => l'agence et le vendeur
mandat exclusif => l'agence

honoraires

semi et simple si 2 personnes 1 qui rentre 1 qui sort chaue personne touche sa commision sur 50% des honoraires

exlusif 60% poyur celui qui rentre

prendre ne comtpe la tva
Afficher prix ht et ttc

| id_vente |                libélé                | code postal | ville |    date    | frais d'agence | id_collaborateur | commission ht | commission ttc |
| :------: | :----------------------------------: | :---------: | :---: | :--------: | :------------: | :--------------: | :-----------: | -------------- |
|    1     | 27 Allée Adrienne-Lecouvreur (entré) |    75007    | Paris | 2022-12-05 |      100       |        2         |      50       | 40             |

    On arrive sur la page de creation d'une vente

        On récupère le palier de commission du collaborateur conscerné
        Si on change de collaborateur, on récupère le palier de commission et sa valeur pour le collaborateur concerné

            La valeur de la commission est calculée en fonction du palier de commission et du montant de frais d'agence
