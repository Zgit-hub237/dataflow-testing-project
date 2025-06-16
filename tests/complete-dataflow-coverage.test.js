const AccountManager = require('../src/account-manager');

/**
 * TESTS COMPLETS DE COUVERTURE DE FLUX DE DONNÉES
 * 
 * Ce fichier démontre l'application complète des trois critères:
 */

describe('++++++++AccountManager - COUVERTURE COMPLÈTE DES FLUX DE DONNÉES++++++++', () => {
    let account;
    
    beforeEach(() => {
        account = new AccountManager("ACC001");
    });

    describe('+++ 1. ALL-DEFS COVERAGE - Toutes les définitions utilisées', () => {
        test('+Couverture des définitions du constructeur', () => {
            // Ce test couvre DEF(1,2,3,4) du constructeur
            // En appelant getAccountInfo(), on utilise toutes les propriétés initialisées
            const info = account.getAccountInfo();
            
            expect(info.id).toBe("ACC001");      
            expect(info.balance).toBe(0);         
            expect(info.active).toBe(true);       
            expect(info.transactions).toBe(0);   
        });

        test('+Couverture des définitions de deposit() - Chemin succès', () => {
            // Couvre DEF(5): amount, DEF(6,7): newBalance et isValid
            // DEF(10): newBalance=balance+amount, DEF(11,12): balance et transactionCount
            
            const result = account.deposit(100);   
            const info = account.getAccountInfo();
            
            expect(result).toBe(100);
            expect(info.balance).toBe(100);      
            expect(info.transactions).toBe(1);    
        });

        test('+Couverture des définitions de deposit() - Chemin erreur', () => {
            // Couvre DEF(8): isValid=false, DEF(9): newBalance=balance
            
            const result = account.deposit(-50);  
            const info = account.getAccountInfo();
            
            expect(result).toBe(0);
            expect(info.transactions).toBe(0);     
        });

        test('+Couverture des définitions de withdraw() - Tous les chemins', () => {
            // Préparer le compte
            account.deposit(200);
            
            const result1 = account.withdraw(50);
            expect(result1).toBe(150);             
            expect(account.getAccountInfo().transactions).toBe(2); 
            
            // Retrait impossible (solde insuffisant)
            const result2 = account.withdraw(300);
            expect(result2).toBe(150);             
            
            // Retrait impossible (montant invalide)
            const result3 = account.withdraw(-10);
            expect(result3).toBe(150);             
        });

        test('+Couverture des définitions de setActive()', () => {
            // Couvre DEF(22): status, DEF(23): isActive
            
            const result = account.setActive(false); 
            expect(result).toBe(false);
            expect(account.getAccountInfo().active).toBe(false); 
        });
    });

    describe('+++ 2. ALL-USES COVERAGE - Tous les couples (DEF, USE)', () => {
        test('+Couples DEF-USE pour deposit()', () => {
            // DEF(5) amount -> P-USE(1) dans condition if (amount <= 0)
            account.deposit(-10);
            expect(account.getAccountInfo().transactions).toBe(0); // P-USE(1) testé (true)
            
            // DEF(5) amount -> C-USE(2) dans calcul newBalance = balance + amount
            account.deposit(75);
            expect(account.getAccountInfo().balance).toBe(75); // C-USE(2) testé
            
            // DEF(7) isValid=true -> P-USE(2) dans condition if (isValid)
            expect(account.getAccountInfo().transactions).toBe(1); // P-USE(2) testé (true)
            
            // DEF(8) isValid=false -> P-USE(2) dans condition if (isValid)
            account.deposit(0);
            expect(account.getAccountInfo().transactions).toBe(1); // P-USE(2) testé (false)
            
            // DEF(10) newBalance -> C-USE(4) pour this.balance = newBalance
            // DEF(10) newBalance -> C-USE(6) pour return newBalance
            const result = account.deposit(25);
            expect(result).toBe(100);              // C-USE(6) testé
            expect(account.getAccountInfo().balance).toBe(100); // C-USE(4) testé
        });

        test('+Couples DEF-USE pour withdraw()', () => {
            account.deposit(150); // Préparer le solde
            
            // DEF(13) amount -> P-USE(3) dans condition if (amount > 0 && ...)
            account.withdraw(-5);
            expect(account.getAccountInfo().balance).toBe(150); // P-USE(3) testé (false)
            
            // DEF(13) amount -> P-USE(5) dans condition if (balance >= amount)
            account.withdraw(200);  // Montant > solde
            expect(account.getAccountInfo().balance).toBe(150); // P-USE(5) testé (false)
            
            // DEF(13) amount -> C-USE(9) dans calcul newBalance = balance - amount
            const result = account.withdraw(50);
            expect(result).toBe(100);               // C-USE(9) testé
            
            // DEF(15) canWithdraw=false -> P-USE(6) dans condition if (canWithdraw)
            account.withdraw(200);
            expect(account.getAccountInfo().transactions).toBe(2); // P-USE(6) testé (false)
            
            // DEF(16) canWithdraw=true -> P-USE(6) dans condition if (canWithdraw)
            account.withdraw(25);
            expect(account.getAccountInfo().transactions).toBe(3); // P-USE(6) testé (true)
            
            // Test avec compte inactif
            account.setActive(false);
            // DEF(3) isActive=false -> P-USE(4) dans condition
            account.withdraw(10);
            expect(account.getAccountInfo().balance).toBe(75); // P-USE(4) testé (false)
        });

        test('+Couples DEF-USE pour les propriétés de classe', () => {
            // Test des différentes affectations et lectures
            
            // transactionCount: DEF(4,12,21) -> C-USE(20)
            expect(account.getAccountInfo().transactions).toBe(0); // DEF(4) -> C-USE(20)
            account.deposit(50);                                   // DEF(12)
            expect(account.getAccountInfo().transactions).toBe(1); // DEF(12) -> C-USE(20)
            account.withdraw(25);                                  // DEF(21)
            expect(account.getAccountInfo().transactions).toBe(2); // DEF(21) -> C-USE(20)
            
            // balance: DEF(2,11,20) -> C-USE(18) et utilisations dans conditions
            expect(account.getAccountInfo().balance).toBe(25);     // DEF(20) -> C-USE(18)
            
            // isActive: DEF(3,23) -> C-USE(19) et P-USE(4)
            account.setActive(false);                              // DEF(23)
            expect(account.getAccountInfo().active).toBe(false);   // DEF(23) -> C-USE(19)
        });
    });

    describe('+++ 3. ALL-DU-PATHS COVERAGE - Tous les chemins DEF→USE', () => {
        test('+Chemins complexes pour deposit() avec conditions imbriquées', () => {
            // Chemin 1: DEF(5) amount -> P-USE(1) false -> DEF(7,10) -> P-USE(2) true -> affectations
            const result1 = account.deposit(100);
            expect(result1).toBe(100);
            expect(account.getAccountInfo().balance).toBe(100);
            expect(account.getAccountInfo().transactions).toBe(1);
            
            // Chemin 2: DEF(5) amount -> P-USE(1) true -> DEF(8,9) -> P-USE(2) false -> pas d'affectation
            const result2 = account.deposit(-20);
            expect(result2).toBe(100);  // newBalance = this.balance (inchangé)
            expect(account.getAccountInfo().balance).toBe(100); // Pas de changement
            expect(account.getAccountInfo().transactions).toBe(1); // Pas d'incrément
            
            // Chemin 3: Montant zéro (cas limite)
            const result3 = account.deposit(0);
            expect(result3).toBe(100);  // Même comportement que négatif
        });

        test('+Chemins complexes pour withdraw() avec conditions multiples', () => {
            account.deposit(200); // Préparer le solde
            
            // Chemin 1: amount > 0 && isActive true -> balance >= amount true -> retrait réussi
            // DEF(13,14,15) -> P-USE(3,4,5) -> DEF(16,17) -> P-USE(6) -> DEF(20,21)
            const result1 = account.withdraw(50);
            expect(result1).toBe(150);
            expect(account.getAccountInfo().transactions).toBe(2);
            
            // Chemin 2: amount > 0 && isActive true -> balance >= amount false -> échec solde
            // DEF(13,14,15) -> P-USE(3,4) true, P-USE(5) false -> DEF(18) -> P-USE(6) false
            const result2 = account.withdraw(300);
            expect(result2).toBe(150);
            expect(account.getAccountInfo().transactions).toBe(2); // Pas d'incrément
            
            // Chemin 3: amount <= 0 -> court-circuit -> échec montant
            // DEF(13,14,15) -> P-USE(3) false -> DEF(19) -> P-USE(6) false
            const result3 = account.withdraw(-10);
            expect(result3).toBe(150);
            
            // Chemin 4: isActive false -> court-circuit -> échec statut
            // DEF(13,14,15) -> P-USE(4) false -> DEF(19) -> P-USE(6) false
            account.setActive(false);
            const result4 = account.withdraw(25);
            expect(result4).toBe(150);
            expect(account.getAccountInfo().transactions).toBe(2); // Toujours pas d'incrément
        });

        test('+Chemins d\'interaction entre méthodes', () => {
            // Test des chemins où une méthode affecte le comportement d'une autre
            
            // Séquence 1: Dépôt -> Retrait -> Vérification des chemins d'état
            account.deposit(100);      // DEF(11) balance=100, DEF(12) transactionCount=1
            account.withdraw(30);      // DEF(20) balance=70, DEF(21) transactionCount=2
            
            let info = account.getAccountInfo();
            expect(info.balance).toBe(70);
            expect(info.transactions).toBe(2);
            
            // Séquence 2: Désactivation -> Tentative de retrait -> Vérification des chemins
            account.setActive(false);  // DEF(23) isActive=false
            account.withdraw(10);      // P-USE(4) false -> pas de changement
            
            info = account.getAccountInfo();
            expect(info.balance).toBe(70);      // Inchangé
            expect(info.transactions).toBe(2);  // Inchangé
            expect(info.active).toBe(false);
            
            // Séquence 3: Réactivation -> Retrait réussi
            account.setActive(true);   // DEF(23) isActive=true
            account.withdraw(20);      // P-USE(4) true -> retrait réussi
            
            info = account.getAccountInfo();
            expect(info.balance).toBe(50);      // Changé
            expect(info.transactions).toBe(3);  // Incrémenté
        });

        test('+Chemins avec valeurs limites et cas particuliers', () => {
            // Test des chemins avec des valeurs spéciales
            
            // Dépôt de montants limites
            account.deposit(0.01);     // Montant très petit mais valide
            expect(account.getAccountInfo().balance).toBe(0.01);
            
            // Retrait exact du solde
            account.withdraw(0.01);    // Retrait complet
            expect(account.getAccountInfo().balance).toBe(0);
            
            // Tentative de retrait sur solde zéro
            const result = account.withdraw(1);
            expect(result).toBe(0);    // DEF(18) newBalance = this.balance (0)
            
            // Dépôt et retrait avec nombres décimaux
            account.deposit(99.99);
            account.withdraw(50.50);
            expect(account.getAccountInfo().balance).toBeCloseTo(49.49, 2);
        });
    });

    describe('+++ Validation finale de la couverture complète', () => {
        test('+Scénario intégré couvrant tous les critères simultanément', () => {
            /**
             * Ce test unique démontre que notre approche satisfait
             * les trois critères de couverture simultanément
             */
            
            // Phase 1: État initial (All-Defs pour le constructeur)
            let info = account.getAccountInfo();
            expect(info.id).toBe("ACC001");         // DEF(1) utilisé
            expect(info.balance).toBe(0);           // DEF(2) utilisé
            expect(info.active).toBe(true);         // DEF(3) utilisé
            expect(info.transactions).toBe(0);      // DEF(4) utilisé
            
            // Phase 2: Dépôts - Couverture des chemins de succès et d'erreur
            account.deposit(150);                   // Chemin succès: DEF(5,7,10,11,12)
            account.deposit(-25);                   // Chemin erreur: DEF(5,8,9)
            
            info = account.getAccountInfo();
            expect(info.balance).toBe(150);         // All-Uses: DEF(11) -> C-USE(18)
            expect(info.transactions).toBe(1);      // All-DU-Paths: chemin succès seulement
            
            // Phase 3: Retraits - Couverture de tous les chemins conditionnels
            account.withdraw(50);                   // Succès: DEF(13,16,17,20,21)
            account.withdraw(200);                  // Échec solde: DEF(13,15,18)
            account.withdraw(-10);                  // Échec montant: DEF(13,19)
            
            info = account.getAccountInfo();
            expect(info.balance).toBe(100);         // Seul le premier retrait a réussi
            expect(info.transactions).toBe(2);      // Un dépôt + un retrait réussis
            
            // Phase 4: Désactivation - Test des interactions entre méthodes
            account.setActive(false);               // DEF(22,23)
            account.withdraw(25);                   // Échec statut: P-USE(4) false
            
            info = account.getAccountInfo();
            expect(info.balance).toBe(100);         // Inchangé car compte inactif
            expect(info.transactions).toBe(2);      // Pas d'incrément
            expect(info.active).toBe(false);        // All-Uses: DEF(23) -> C-USE(19)
            
            // Phase 5: Réactivation et opération finale
            account.setActive(true);                // DEF(23) = true
            account.withdraw(100);                  // Retrait complet du solde
            
            info = account.getAccountInfo();
            expect(info.balance).toBe(0);           // Solde épuisé
            expect(info.transactions).toBe(3);      // Compteur final
            expect(info.active).toBe(true);         // Compte réactivé
        });
    });
});
