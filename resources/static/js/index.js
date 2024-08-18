document.addEventListener('DOMContentLoaded', () => {
    const budgetForm = document.getElementById('budget-form');
    const transactionForm = document.getElementById('transaction-form');
    const budgetList = document.getElementById('budget-list');
    const transactionList = document.getElementById('transaction-list');

    budgetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(budgetForm);
        const categoryData = {
            name: formData.get('category')
        }
        try {
            const response = await fetch('http://localhost:8080/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryData)
            });
            const data1 = await response.json();
            console.log(data1)
            setTimeout(()=>{
                
            },1000)
            const budgetData = {
                category: {
                    id: data1.id
                },
                amount: parseFloat(formData.get('amount')),
                startDate: formData.get('start-date'),
                endDate: formData.get('end-date')
            };

            const response2 = await fetch('http://localhost:8080/api/budgets', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(budgetData)
            });
            const data2 = await response2.json();
            console.log(data2)
            displayBudgets();
        } catch (error) {
            console.error('Error:', error);
        }





    });

    transactionForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(transactionForm);
        const transactionData = {
            type: formData.get('type'),
            amount: parseFloat(formData.get('amount')),
            category: formData.get('category'),
            date: formData.get('date'),
            description: formData.get('description')
        };
        try {
            const response = await fetch('http://localhost:8080/api/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(transactionData)
            });
            const data = await response.json();
            displayTransactions();
        } catch (error) {
            console.error('Error:', error);
        }
    });

    async function displayBudgets() {
        try {
            const response = await fetch('http://localhost:8080/api/budgets');
            const data = await response.json();
            console.log(data[1])
            budgetList.innerHTML = data.map(budget => `
                <div>
                    <p>Category: ${budget.category.name}</p>
                    <p>Amount: ${budget.amount}</p>
                    <p>Start Date: ${budget.startDate}</p>
                    <p>End Date: ${budget.endDate}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function displayTransactions() {
        try {
            const response = await fetch('http://localhost:8080/api/transactions');
            const data = await response.json();
            transactionList.innerHTML = data.map(transaction => `
                <div>
                    <p>Type: ${transaction.type}</p>
                    <p>Amount: ${transaction.amount}</p>
                    <p>Category: ${transaction.category}</p>
                    <p>Date: ${transaction.date}</p>
                    <p>Description: ${transaction.description}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Load initial data
    displayBudgets();
    displayTransactions();
});