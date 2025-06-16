/**
 * Gestionnaire de Compte Bancaire Simplifié
 * Démonstration des flux de données pour la couverture de tests
 * 
 * Variables analysées et leurs flux :
 * - DEF: Points où les variables sont définies/initialisées
 * - C-USE: Utilisations computationnelles (calculs, affectations)
 * - P-USE: Utilisations prédicatives (conditions, boucles)
 */
class AccountManager {
    constructor(accountId) {
        this.accountId = accountId;     // DEF(1): accountId
        this.balance = 0;               // DEF(2): balance
        this.isActive = true;           // DEF(3): isActive
        this.transactionCount = 0;      // DEF(4): transactionCount
    }

    /**
     * Dépôt d'argent
     * Démontre les flux simples DEF -> USE
     */
    deposit(amount) {
        // DEF(5): amount (paramètre)
        let newBalance;                 // DEF(6): newBalance
        let isValid = true;             // DEF(7): isValid
        
        // P-USE(1): amount dans condition
        if (amount <= 0) {
            isValid = false;            // DEF(8): isValid
            newBalance = this.balance;  // DEF(9): newBalance (C-USE(1): balance)
        } else {
            // C-USE(2): amount dans calcul
            // C-USE(3): balance dans calcul
            newBalance = this.balance + amount;  // DEF(10): newBalance
        }
        
        // P-USE(2): isValid dans condition
        if (isValid) {
            // C-USE(4): newBalance pour affectation
            this.balance = newBalance;          // DEF(11): balance
            // C-USE(5): transactionCount pour incrément
            this.transactionCount++;            // DEF(12): transactionCount
        }
        
        // C-USE(6): newBalance pour retour
        return newBalance;
    }

    /**
     * Retrait d'argent avec validation
     * Démontre les chemins multiples et conditions complexes
     */
    withdraw(amount) {
        // DEF(13): amount (paramètre)
        let newBalance;                 // DEF(14): newBalance
        let canWithdraw = false;        // DEF(15): canWithdraw
        
        // P-USE(3): amount dans condition
        // P-USE(4): isActive dans condition
        if (amount > 0 && this.isActive) {
            // C-USE(7): balance dans condition
            // P-USE(5): balance dans comparaison
            if (this.balance >= amount) {
                canWithdraw = true;     // DEF(16): canWithdraw
                // C-USE(8): balance dans calcul
                // C-USE(9): amount dans calcul
                newBalance = this.balance - amount;  // DEF(17): newBalance
            } else {
                newBalance = this.balance;           // DEF(18): newBalance (C-USE(10): balance)
            }
        } else {
            newBalance = this.balance;               // DEF(19): newBalance (C-USE(11): balance)
        }
        
        // P-USE(6): canWithdraw dans condition
        if (canWithdraw) {
            // C-USE(12): newBalance pour affectation
            this.balance = newBalance;          // DEF(20): balance
            // C-USE(13): transactionCount pour incrément
            this.transactionCount++;            // DEF(21): transactionCount
        }
        
        // C-USE(14): newBalance pour retour
        return newBalance;
    }

    /**
     * Activation/Désactivation du compte
     * Démontre les affectations booléennes
     */
    setActive(status) {
        // DEF(22): status (paramètre)
        // C-USE(15): status pour affectation
        this.isActive = status;         // DEF(23): isActive
        // C-USE(16): status pour retour
        return status;
    }

    /**
     * Obtenir les informations du compte
     * Démontre les utilisations de lecture
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