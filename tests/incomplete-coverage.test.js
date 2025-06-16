const AccountManager = require('../src/account-manager-with-issues');

/**
 * TESTS INCOMPLETS - DÉMONSTRATION DES PROBLÈMES DE COUVERTURE
 * 
 * CES TESTS SONT INTENTIONNELLEMENT INCOMPLETS
 * Objectif: Montrer ce qui arrive quand on n'applique pas
 * les critères de couverture de flux de données correctement
 */

describe('--------AccountManager - TESTS INCOMPLETS (Démonstration des problèmes)--------', () => {
    let account;
    
    beforeEach(() => {
        account = new AccountManager("ACC001");
    });

    describe('--- Couverture partielle - Cas typiques d\'une suite de tests défaillante', () => {
        test('Test basique deposit() - Ne couvre que le chemin de succès', () => {
            

            const result = account.deposit(100);
            expect(result).toBe(100);
            expect(account.getAccountInfo().balance).toBe(100);
            expect(account.getAccountInfo().transactions).toBe(1);
        });

        test('Test basique withdraw() - Seulement cas normal', () => {
            // Préparer le compte
            account.deposit(200);
            
            //  PROBLÈME: On ne teste qu'un seul chemin de succès
            const result = account.withdraw(50);
            expect(result).toBe(150);
            expect(account.getAccountInfo().balance).toBe(150);
            
        });

        test('Test setActive() - Seulement activation', () => {
            //  PROBLÈME: On ne teste qu'un sens de la fonctionnalité
            const result = account.setActive(true);
            expect(result).toBe(true);
            expect(account.getAccountInfo().active).toBe(true); 
        });
    });

    describe('---Démonstration des métriques dégradées', () => {
        test('Scénario utilisateur basique - Couverture très insuffisante', () => {
            // Scénario simple qui ne couvre qu'une petite fraction du code
            account.deposit(150);
            account.withdraw(50);
            account.setActive(false);
            account.setActive(true);
            
            const finalInfo = account.getAccountInfo();
            expect(finalInfo.balance).toBe(100);
            expect(finalInfo.transactions).toBe(2);
            expect(finalInfo.active).toBe(true);
            
            //  Ce test fonctionne mais... avec des ÉNORMES PROBLÈMES DE COUVERTURE:
        });
    });
});
