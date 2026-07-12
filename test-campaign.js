const { io } = require('socket.io-client');

const socket = io('http://localhost:4040');

socket.on('connect', () => {
  console.log('Conectado ao servidor. Iniciando teste de campanha simulada...');
  
  // Criando 3 contatos falsos para teste seguro
  const mockCustomers = [
    { name: 'Cliente Teste 1', phone: '11900000001' },
    { name: 'Cliente Teste 2', phone: '11900000002' },
    { name: 'Cliente Teste 3', phone: '11900000003' }
  ];

  socket.emit('start_campaign', {
    customers: mockCustomers,
    template: 'Olá {nome}, isso é um teste interno seguro da {empresa}.',
    companyInfo: { name: 'LavaOS Test' }
  });
});

socket.on('campaign_progress', (data) => {
  console.log(`[PROGRESSO] Status: ${data.status} | Mensagem: ${data.message}`);
  
  if (data.status === 'finished') {
    console.log('Teste concluído com sucesso!');
    process.exit(0);
  }
});

socket.on('connect_error', (err) => {
  console.error('Erro de conexão:', err.message);
  process.exit(1);
});
