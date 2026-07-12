const fs = require('fs');

let code = fs.readFileSync('src/context/GlobalContext.tsx', 'utf8').replace(/\r\n/g, '\n');

// Replace savedCustomers block exactly by string replacement
const searchString = `    const savedCustomers = localStorage.getItem('lavaos_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    } else {
      setCustomers([
        { id: 'c1', name: 'Ivone de Castilho Domingues', phone: '(47) 3322-2563', type: 'PF', ltv: 4250 },
        { id: 'c2', name: 'Carlos Almeida Silva', phone: '(11) 98888-7777', type: 'PF', ltv: 1100 },
        { id: 'c3', name: 'Empresa XYZ Ltda', phone: '(47) 3322-1111', type: 'PJ', ltv: 15000 },
        { id: 'c4', name: 'Hotel Central', phone: '(47) 3333-4444', type: 'PJ', ltv: 32000 }
      ]);
    }`;

const replaceString = `    const savedCustomers = localStorage.getItem('lavaos_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    
    // Fetch from backend to sync
    fetch('/api/customers')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCustomers(data.data.map((c) => ({
            id: c.id,
            name: c.name,
            phone: c.phone || '',
            type: c.type || 'PF',
            ltv: parseFloat(c.totalSpent) || 0
          })));
        }
      })
      .catch(err => console.error("Erro ao carregar clientes do banco:", err));`;

if (code.includes(searchString)) {
    code = code.replace(searchString, replaceString);
    console.log("Replaced Customers Fetch block");
} else {
    console.log("Could NOT find Customers Fetch block");
}


// Replace addCustomer exactly
const searchAdd = `  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
  };`;

const replaceAdd = `  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
    fetch('/api/customers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer)
    }).catch(e => console.error(e));
  };`;

if (code.includes(searchAdd)) {
    code = code.replace(searchAdd, replaceAdd);
    console.log("Replaced addCustomer block");
} else {
    console.log("Could NOT find addCustomer block");
}

fs.writeFileSync('src/context/GlobalContext.tsx', code);
console.log('Done.');
