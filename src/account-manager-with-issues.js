/**
 * Gestionnaire de Compte Bancaire avec CODE MORT et CHEMINS NON TESTÉS
 * Version pour démonstration des problèmes de couverture
 * 
 * PROBLÈMES INTENTIONNELS :
 * - Variables définies mais jamais utilisées
 * - Branches de code inaccessibles
 * - Méthodes non appelées
 * - Chemins d'exécution manqués
 */
class AccountManager {
    constructor(accountId) {
        this.accountId = accountId;     // DEF(1): accountId
        this.balance = 0;               // DEF(2): balance 
        this.isActive = true;           // DEF(3): isActive 
        this.transactionCount = 0;      // DEF(4): transactionCount 
        this.maxDailyLimit = 1000;      // DEF(5): maxDailyLimit 
        this.debugMode = false;         // DEF(6): debugMode 
    }

    /**
     * Dépôt avec probleme intentionnels
     */
    deposit(amount) {
        // DEF(7): amount (paramètre)
        let newBalance;                 // DEF(8): newBalance
        let isValid = true;             // DEF(9): isValid
        let bonusAmount = 0;            // DEF(10): bonusAmount 
        
        // P-USE(1): amount dans condition
        if (amount <= 0) {
            isValid = false;            // DEF(11): isValid
            newBalance = this.balance;  // DEF(12): newBalance (C-USE(1): balance)
        } else {
            // C-USE(2): amount dans calcul
            // C-USE(3): balance dans calcul
            newBalance = this.balance + amount;  // DEF(13): newBalance
            
            
            if (amount > 10000) {
                bonusAmount = amount * 0.01;    // DEF(14): bonusAmount 
                newBalance += bonusAmount;      // DEF(15): newBalance 
                let vipStatus = true;           // DEF(16): vipStatus 
            }
        }
        
        // P-USE(2): isValid dans condition
        if (isValid) {
            // C-USE(4): newBalance pour affectation
            this.balance = newBalance;          // DEF(17): balance
            // C-USE(5): transactionCount pour incrément
            this.transactionCount++;            // DEF(18): transactionCount
            
            // logiq debug
            if (this.debugMode) {               // P-USE(3): debugMode 
                console.log("Deposit completed"); 
            }
        }
        
        // C-USE(6): newBalance pour retour
        return newBalance;
    }

    /**
     * Retrait avec avec probleme intentionnels
     */
    withdraw(amount) {
        // DEF(19): amount (paramètre)
        let newBalance;                 // DEF(20): newBalance
        let canWithdraw = false;        // DEF(21): canWithdraw
        let dailyTotal = 0;             // DEF(22): dailyTotal 
        
        // P-USE(4): amount dans condition
        // P-USE(5): isActive dans condition
        if (amount > 0 && this.isActive) {
            // C-USE(7): balance dans condition
            // P-USE(6): balance dans comparaison
            if (this.balance >= amount) {
                canWithdraw = true;     // DEF(23): canWithdraw
                // C-USE(8): balance dans calcul
                // C-USE(9): amount dans calcul
                newBalance = this.balance - amount;  // DEF(24): newBalance
                
                // LOGIQUE LIMITE QUOTIDIENNE 
                dailyTotal = amount;    // DEF(25): dailyTotal - JAMAIS TESTÉ
                if (dailyTotal > this.maxDailyLimit) {  // P-USE(7): maxDailyLimit 
                    canWithdraw = false;        // DEF(26): canWithdraw 
                    newBalance = this.balance;  // DEF(27): newBalance 
                }
            } else {
                newBalance = this.balance;           // DEF(28): newBalance (C-USE(10): balance)
            }
        } else {
            newBalance = this.balance;               // DEF(29): newBalance (C-USE(11): balance)
        }
        
        // P-USE(8): canWithdraw dans condition
        if (canWithdraw) {
            // C-USE(12): newBalance pour affectation
            this.balance = newBalance;          // DEF(30): balance
            // C-USE(13): transactionCount pour incrément
            this.transactionCount++;            // DEF(31): transactionCount
        }
        
        // C-USE(14): newBalance pour retour
        return newBalance;
    }

    /**
     * MÉTHODE JAMAIS APPELÉE DANS LES TESTS (CODE MORT)
     */
    transfer(toAccount, amount) {
        // DEF(32): toAccount, DEF(33): amount 
        let success = false;            // DEF(34): success 
        let transferFee = 2;            // DEF(35): transferFee 
        
        if (this.balance >= (amount + transferFee)) {
            this.balance -= (amount + transferFee);  // DEF(36): balance 
            success = true;             // DEF(37): success 
            this.transactionCount++;    // DEF(38): transactionCount 
        }
        
        return success;                
    }

    /**
     * Activation/Désactivation 
     */
    setActive(status) {
        // DEF(39): status (paramètre)
        let timestamp = new Date();     // DEF(40): timestamp 
        
        // C-USE(15): status pour affectation
        this.isActive = status;         // DEF(41): isActive
        
        // LOGIQUE DEBUG 
        if (this.debugMode) {           // P-USE(9): debugMode 
            console.log("Status changed at", timestamp); 
        }
        
        // C-USE(16): status pour retour
        return status;
    }

    /**
     * GetAccountInfo 
     */
    getAccountInfo() {
        // C-USE(17): accountId pour lecture
        // C-USE(18): balance pour lecture
        // C-USE(19): isActive pour lecture
        // C-USE(20): transactionCount pour lecture
        return {
            id: this.accountId,
            balance: this.balance,
            active: this.isActive,
            transactions: this.transactionCount
        };
    }

}

module.exports = AccountManager;