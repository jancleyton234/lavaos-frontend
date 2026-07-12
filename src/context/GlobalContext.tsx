'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type OrderStatus = 'Triagem' | 'Lavagem' | 'Passadoria' | 'Controle de Qualidade' | 'Pronto p/ Entrega' | 'Entregue';

export type LeadStatus = 'Atendimento' | 'Curioso' | 'Orçamento Solicitado' | 'Serviço Fechado' | 'Perdido';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'client' | 'agent';
  agentName?: string;
  date: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: LeadStatus;
  lastMessage: string;
  date: string;
  messages?: ChatMessage[];
  assignedTo?: string | null;
  unreadCount?: number;
}

export interface CompanyInfo {
  name: string;
  cnpj: string;
  phone: string;
  address: string;
  logoUrl?: string;
}

export interface LavaMindConfig {
  autonomy: string;
  tone: string;
}

export interface CartItemType {
  id: string;
  name: string;
  pricePerUnit: number;
  unit: string;
  quantity: number;
  width?: number;
  length?: number;
  weight?: number;
  subtotal: number;
  beforePhoto?: string;
  afterPhoto?: string;
}

export interface Order {
  id: string;
  osNumber?: string;
  client: string;
  deadline: string;
  items: CartItemType[];
  total: number;
  deliveryFee?: number;
  discountType?: 'percent' | 'fixed';
  discountValue?: number;
  paymentMethod: string;
  status: OrderStatus;
  date: string;
  requiredStages?: OrderStatus[];
  companyInfo?: {
    name: string;
    phone: string;
    logoUrl?: string;
  };
}

export interface CatalogItem {
  id: string;
  name: string;
  cat: string;
  price: number;
  emoji: string;
  unit: 'unidade' | 'm2' | 'kg' | 'metro';
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  type: 'PF' | 'PJ';
  ltv: number;
  tags?: string[];
  lastContactTimestamp?: number;
}

export interface Transaction {
  id: string;
  type: 'Receita' | 'Despesa';
  description: string;
  amount: number;
  paymentMethod: string;
  date: string;
}

export interface SystemUser {
  id: string;
  name: string;
  login: string;
  pwd: string;
  role: 'Administrador' | 'Operador' | 'Atendente';
}

interface GlobalContextType {
  leads: Lead[];
  addLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  assumeChat: (leadId: string, agentId: string) => void;
  finishChat: (leadId: string) => void;
  addChatMessage: (leadId: string, msg: ChatMessage) => void;
  clearUnreadCount: (leadId: string) => void;
  wipeAllLeads: () => void;

  osCounter: number;

  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, newStatus: OrderStatus) => void;
  updateOrderItemPhoto: (orderId: string, itemId: string, photoType: 'before' | 'after', photoData: string) => void;
  updateOrderStages: (orderId: string, stages: OrderStatus[]) => void;
  updateOrderPayment: (orderId: string, paymentMethod: string) => void;
  
  companyInfo: CompanyInfo;
  updateCompanyInfo: (info: CompanyInfo) => void;
  
  lavaMindConfig: LavaMindConfig;
  updateLavaMindConfig: (config: LavaMindConfig) => void;
  
  catalogItems: CatalogItem[];
  addCatalogItem: (item: CatalogItem) => void;
  removeCatalogItem: (id: string) => void;

  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomerTags: (id: string, tags: string[]) => void;
  syncManyCustomers: (newCustomers: any[]) => void;
  deleteCustomer: (id: string) => void;
  clearAllCustomers: () => void;

  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;

  whatsappConnected: boolean;
  setWhatsappConnected: (connected: boolean) => void;
  waQrCode: string;
  waPairingCode: string;
  waPairingError: string;
  requestWaPairingCode: (phone: string) => void;

  users: SystemUser[];
  addUser: (user: SystemUser) => void;
  deleteUser: (id: string) => void;

  isAuthenticated: boolean;
  currentUser: SystemUser | null;
  login: (login: string, pwd: string) => boolean;
  logout: () => void;

  cashRegisterStatus: 'open' | 'closed';
  cashRegisterBalance: number;
  openCashRegister: (initialAmount: number) => void;
  closeCashRegister: () => void;
  
  upcomingDates: {name: string, date: string, type: string}[];
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    name: 'Lava-Me Lavanderias Premium',
    cnpj: '00.000.000/0001-00',
    phone: '(11) 99999-9999',
    address: 'Rua das Flores, 123 - Centro'
  });
  const [lavaMindConfig, setLavaMindConfig] = useState<LavaMindConfig>({
    autonomy: 'Sugerir ações (Requer aprovação manual)',
    tone: 'Profissional e Direto'
  });
  const [whatsappConnectedState, setWhatsappConnectedState] = useState(false);
  const [waQrCode, setWaQrCode] = useState('');
  const [waPairingCode, setWaPairingCode] = useState('');
  const [waPairingError, setWaPairingError] = useState('');
  const [socketInstance, setSocketInstance] = useState<any>(null);
  const [users, setUsers] = useState<SystemUser[]>([
    { id: '1', name: 'Administrador', login: 'admin', pwd: '123456', role: 'Administrador' }
  ]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<SystemUser | null>(null);
  
  const [cashRegisterStatus, setCashRegisterStatus] = useState<'open' | 'closed'>('closed');
  const [cashRegisterBalance, setCashRegisterBalance] = useState(0);

  const [upcomingDates, setUpcomingDates] = useState<{name: string, date: string, type: string}[]>([]);

  const [osCounter, setOsCounter] = useState(0);

  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedLeads = localStorage.getItem('lavaos_leads');
    if (savedLeads) {
      setLeads(JSON.parse(savedLeads));
    } else {
      setLeads([
        { id: 'L1', name: 'Maria Souza', phone: '(11) 97777-5555', status: 'Curioso', lastMessage: 'Qual o valor pra lavar tapete?', date: new Date().toLocaleDateString('pt-BR'), messages: [], assignedTo: null, unreadCount: 0 }
      ]);
    }

    const savedOrders = localStorage.getItem('lavaos_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    
    const savedOsCounter = localStorage.getItem('lavaos_os_counter');
    if (savedOsCounter) {
      setOsCounter(parseInt(savedOsCounter, 10));
    }
    
    const savedCatalog = localStorage.getItem('lavaos_catalog');
    if (savedCatalog) {
      setCatalogItems(JSON.parse(savedCatalog));
    } else {
      // Itens iniciais (seeder)
      setCatalogItems([
        { id: '1001', name: 'Calça Jeans', cat: 'Vestuário Diário', price: 24.50, emoji: '👖', unit: 'unidade' },
        { id: '1002', name: 'Camisa Social', cat: 'Vestuário Diário', price: 26.00, emoji: '👔', unit: 'unidade' },
        { id: '2005', name: 'Edredom Casal', cat: 'Cama e Banho', price: 65.00, emoji: '🛏️', unit: 'unidade' },
        { id: '3010', name: 'Tapete Persa', cat: 'Tapeçaria', price: 80.00, emoji: '🧵', unit: 'm2' }
      ]);
    }

    const savedCustomers = localStorage.getItem('lavaos_customers');
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
    
    // Fetch from backend to sync with cache buster for Next.js Router Cache
    fetch(`/api/customers?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCustomers(data.data.map((c: any) => ({
            id: c.id,
            name: c.name,
            phone: c.phone || '',
            type: c.type || 'PF',
            ltv: parseFloat(c.totalSpent) || 0
          })));
        }
      })
      .catch(err => console.error("Erro ao carregar clientes do banco:", err));

    const savedTransactions = localStorage.getItem('lavaos_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    } else {
      setTransactions([
        { id: 't1', type: 'Receita', description: 'Recebimento Atendimento #1020', amount: 150.00, paymentMethod: 'PIX', date: new Date().toLocaleDateString('pt-BR') },
        { id: 't2', type: 'Despesa', description: 'Pagamento Fornecedor de Sabão', amount: 450.00, paymentMethod: 'Transferência', date: new Date().toLocaleDateString('pt-BR') }
      ]);
    }

    const savedCompanyInfo = localStorage.getItem('lavaos_company');
    if (savedCompanyInfo) {
      setCompanyInfo(JSON.parse(savedCompanyInfo));
    }
    
    // Fetch from backend
    fetch(`/api/settings/company?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setCompanyInfo(data.data);
          localStorage.setItem('lavaos_company', JSON.stringify(data.data));
        }
      })
      .catch(err => console.error("Erro ao carregar dados da empresa do banco:", err));

    const savedLavaMind = localStorage.getItem('lavaos_lavamind');
    if (savedLavaMind) {
      setLavaMindConfig(JSON.parse(savedLavaMind));
    }

    const savedWa = localStorage.getItem('lavaos_wpp_connected');
    if (savedWa) {
      setWhatsappConnectedState(savedWa === 'true');
    }

    const savedUsers = localStorage.getItem('lavaos_users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    const savedAuth = localStorage.getItem('lavaos_auth');
    if (savedAuth) {
      setIsAuthenticated(savedAuth === 'true');
    }
    
    const savedUser = localStorage.getItem('lavaos_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else if (savedAuth === 'true') {
      // Se estava logado na versão antiga mas sem currentUser, força o admin
      setCurrentUser({ id: '1', name: 'Administrador', login: 'admin', pwd: '123456', role: 'Administrador' });
      localStorage.setItem('lavaos_current_user', JSON.stringify({ id: '1', name: 'Administrador', login: 'admin', pwd: '123456', role: 'Administrador' }));
    }

    const savedRegisterStatus = localStorage.getItem('lavaos_register_status');
    if (savedRegisterStatus === 'open') {
      setCashRegisterStatus('open');
      const savedBalance = localStorage.getItem('lavaos_register_balance');
      if (savedBalance) setCashRegisterBalance(parseFloat(savedBalance));
    }

    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever states change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('lavaos_leads', JSON.stringify(leads));
      localStorage.setItem('lavaos_orders', JSON.stringify(orders));
      localStorage.setItem('lavaos_catalog', JSON.stringify(catalogItems));
      localStorage.setItem('lavaos_customers', JSON.stringify(customers));
      localStorage.setItem('lavaos_transactions', JSON.stringify(transactions));
      localStorage.setItem('lavaos_company', JSON.stringify(companyInfo));
      localStorage.setItem('lavaos_lavamind', JSON.stringify(lavaMindConfig));
      localStorage.setItem('lavaos_os_counter', osCounter.toString());
    }
  }, [leads, orders, catalogItems, customers, transactions, companyInfo, lavaMindConfig, isLoaded]);

  // Handle WhatsApp Socket Connection
  useEffect(() => {
    if (!isLoaded) return;
    
    // Conectar ao backend
    import('socket.io-client').then(({ io }) => {
      const newSocket = io(process.env.NEXT_PUBLIC_API_URL || 'http://213.136.70.2:4040');
      setSocketInstance(newSocket);

      newSocket.on('connect', () => {
        console.log('Conectado ao servidor de WebSockets no GlobalContext');
      });

      newSocket.on('whatsapp_status', (status: boolean) => {
        setWhatsappConnectedState(status);
        if (status) {
          setWaQrCode('');
          localStorage.setItem('lavaos_wpp_connected', 'true');
        } else {
          localStorage.setItem('lavaos_wpp_connected', 'false');
        }
      });

      newSocket.on('whatsapp_qr', (qr: string) => {
        setWaQrCode(qr);
        setWaPairingCode('');
        setWaPairingError('');
        setWhatsappConnectedState(false);
      });

      newSocket.on('pairing_code_result', (data: { code: string, error: string }) => {
        if (data.error) {
          setWaPairingError(data.error);
          setWaPairingCode('');
        } else {
          setWaPairingCode(data.code);
          setWaPairingError('');
        }
      });

      newSocket.on('new_whatsapp_lead', (data: any) => {
        setLeads(prevLeads => {
          const existingLead = prevLeads.find(l => l.phone.replace(/\D/g, '') === data.phone.replace(/\D/g, ''));
          
          const newMsg: ChatMessage = {
            id: `msg-${Date.now()}`,
            text: data.message,
            sender: 'client',
            date: new Date().toLocaleTimeString('pt-BR')
          };

          if (existingLead) {
             return prevLeads.map(l => {
               if (l.id === existingLead.id) {
                 return {
                   ...l,
                   lastMessage: data.message,
                   messages: [...(l.messages || []), newMsg],
                   unreadCount: (l.unreadCount || 0) + 1,
                   // Se estava em "Perdido" ou fechado, volta pra Atendimento
                   status: (l.status === 'Perdido' || l.status === 'Serviço Fechado') ? 'Atendimento' : l.status
                 };
               }
               return l;
             });
          }

          const newLead: Lead = {
            id: `L-${data.id || Date.now()}`,
            name: data.name || 'Desconhecido',
            phone: data.phone || 'Sem Número',
            status: 'Atendimento',
            lastMessage: data.message,
            date: new Date().toLocaleDateString('pt-BR'),
            messages: [newMsg],
            assignedTo: null,
            unreadCount: 1
          };
          return [newLead, ...prevLeads];
        });

        // Auto-cadastrar como cliente
        setCustomers(prevCustomers => {
          const existingCustomer = prevCustomers.find(c => c.phone.replace(/\D/g, '') === data.phone.replace(/\D/g, ''));
          if (!existingCustomer) {
            const newCustomer: Customer = {
              id: `c-wpp-${Date.now()}`,
              name: data.name || 'Desconhecido',
              phone: data.phone,
              type: 'PF',
              ltv: 0
            };
            return [newCustomer, ...prevCustomers];
          }
          return prevCustomers;
        });
      });
      
      newSocket.on('commemorative_dates_result', (dates: any[]) => {
        if (dates && dates.length > 0) {
          setUpcomingDates(dates);
        }
      });

      // Pedir os feriados usando o endereço da empresa ao conectar
      if (companyInfo && companyInfo.address) {
        newSocket.emit('fetch_commemorative_dates', { address: companyInfo.address });
      }

      return () => {
        newSocket.close();
      };
    });
  }, [isLoaded, companyInfo.address]);

  const addLead = (lead: Lead) => {
    setLeads(prev => [lead, ...prev]);
    
    // Auto-cadastrar como cliente para campanhas de remarketing
    setCustomers(prevCustomers => {
      const existingCustomer = prevCustomers.find(c => c.phone === lead.phone);
      if (!existingCustomer) {
        const newCustomer: Customer = {
          id: `c-wpp-${Date.now()}`,
          name: lead.name,
          phone: lead.phone,
          type: 'PF',
          ltv: 0
        };
        return [newCustomer, ...prevCustomers];
      }
      return prevCustomers;
    });
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const assumeChat = (leadId: string, agentId: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, assignedTo: agentId, status: 'Atendimento' } : l));
  };

  const finishChat = (leadId: string) => {
    // Ao finalizar o chat, manda para Curioso no funil
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: 'Curioso', assignedTo: null } : l));
  };

  const addChatMessage = (leadId: string, msg: ChatMessage) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, messages: [...(l.messages || []), msg], lastMessage: msg.text } : l));
  };

  const clearUnreadCount = (leadId: string) => {
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, unreadCount: 0 } : l));
  };

  const wipeAllLeads = () => {
    setLeads([]);
    localStorage.removeItem('lavaos_leads');
  };

  const addOrder = (order: Order) => {
    let finalOrder = { ...order, companyInfo };
    if (!finalOrder.osNumber) {
      const nextCounter = osCounter + 1;
      setOsCounter(nextCounter);
      finalOrder.osNumber = String(nextCounter).padStart(6, '0');
      // Save counter immediately
      localStorage.setItem('lavaos_os_counter', String(nextCounter));
    }
    setOrders((prev) => [finalOrder, ...prev]);

    // Push para a Nuvem (Rastreamento em tempo real)
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(finalOrder)
    }).catch(err => console.error('Erro ao salvar na nuvem', err));
  };

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) => {
      const oldOrder = prev.find(o => o.id === id);
      const isNewlyReady = oldOrder && oldOrder.status !== 'Pronto p/ Entrega' && newStatus === 'Pronto p/ Entrega';
      
      const updated = prev.map(o => o.id === id ? { ...o, status: newStatus, companyInfo } : o);
      const targetOrder = updated.find(o => o.id === id);
      
      if (targetOrder) {
        // Push para a Nuvem (Rastreamento em tempo real)
        fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(targetOrder)
        }).catch(err => console.error('Erro ao atualizar na nuvem', err));
        
        // Disparo automático de WhatsApp se a OS estiver pronta
        if (isNewlyReady) {
          // Precisamos encontrar o telefone do cliente na lista de customers
          // (Como estamos em setOrders(prev => ...), não podemos usar hooks state diretamente se não tivermos na closure,
          // mas 'customers' está no escopo de GlobalProvider)
          const clientData = customers.find(c => c.name === targetOrder.client);
          if (clientData && clientData.phone) {
            const domainUrl = typeof window !== 'undefined' ? window.location.origin : 'https://lavaos-frontend-aw8c.vercel.app';
            
            // Clone order and remove base64 logo to prevent 3MB URLs
            const orderForUrl = { ...targetOrder };
            if (orderForUrl.companyInfo) {
              orderForUrl.companyInfo = { ...orderForUrl.companyInfo, logoUrl: '' };
            }

            // Encode the target order
            const encoded = window.btoa(unescape(encodeURIComponent(JSON.stringify(orderForUrl))));
            const trackUrl = `${domainUrl}/track/${targetOrder.id}?d=${encoded}`;
            
            const hour = new Date().getHours();
            let greeting = 'Bom dia';
            if (hour >= 12 && hour < 18) greeting = 'Boa tarde';
            else if (hour >= 18 || hour < 5) greeting = 'Boa noite';

            const firstName = clientData.name.split(' ')[0] || 'Cliente';
            const companyName = companyInfo.name || 'nossa loja';
            
            const message = `${greeting} ${firstName}! Passando para avisar que sua Ordem de Serviço *${targetOrder.osNumber || targetOrder.id}* está PRONTA para retirada na ${companyName}! 🧼✅\n\nAcompanhe os detalhes e o recibo clicando no link abaixo:\n${trackUrl}`;
            
            fetch('/api/whatsapp/send', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ phone: clientData.phone, message })
            })
            .then(res => res.json())
            .then(data => {
              if (data.success) {
                console.log(`[WhatsApp Auto] Mensagem enviada para ${clientData.name}`);
              } else {
                console.warn(`[WhatsApp Auto] Falha ao enviar para ${clientData.name}:`, data.message);
              }
            })
            .catch(err => console.error('[WhatsApp Auto] Erro de requisição:', err));
          } else {
            console.warn(`[WhatsApp Auto] Cliente ${targetOrder.client} não encontrado na lista de clientes, impossível enviar notificação automática.`);
          }
        }
      }
      return updated;
    });
  };

  const updateOrderItemPhoto = (orderId: string, itemId: string, photoType: 'before' | 'after', photoData: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id !== orderId) return o;
      return {
        ...o,
        items: o.items.map(i => i.id === itemId ? { ...i, [photoType === 'before' ? 'beforePhoto' : 'afterPhoto']: photoData } : i)
      };
    }));
  };

  const updateOrderStages = (orderId: string, stages: OrderStatus[]) => {
    setOrders((prev) => prev.map(o => o.id === orderId ? { ...o, requiredStages: stages } : o));
  };

  const updateOrderPayment = (orderId: string, paymentMethod: string) => {
    setOrders((prev) => prev.map(o => o.id === orderId ? { ...o, paymentMethod } : o));
  };

  const updateCompanyInfo = (info: CompanyInfo) => {
    setCompanyInfo(info);
    fetch('/api/settings/company', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    }).catch(e => console.error(e));
  };

  const updateLavaMindConfig = (config: LavaMindConfig) => {
    setLavaMindConfig(config);
  };

  const addCatalogItem = (item: CatalogItem) => {
    setCatalogItems(prev => [...prev, item]);
  };

  const removeCatalogItem = (id: string) => {
    setCatalogItems(prev => prev.filter(i => i.id !== id));
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
    fetch('/api/customers', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(customer)
    }).catch(e => console.error(e));
  };

  const updateCustomerTags = (id: string, tags: string[]) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, tags } : c));
  };

  const syncManyCustomers = (newCustomers: any[]) => {
    setCustomers(prev => {
      const merged = [...prev];
      for (const nc of newCustomers) {
        const cleanPhone = nc.phone.replace(/\D/g, '');
        const existingIndex = merged.findIndex(c => c.phone.replace(/\D/g, '') === cleanPhone);
        
        if (existingIndex !== -1) {
          // Se já existe e viemos do Deep Scan (tem tags), atualiza
          if (nc.tags || nc.lastContactTimestamp) {
            merged[existingIndex] = {
              ...merged[existingIndex],
              tags: nc.tags ? [...new Set([...(merged[existingIndex].tags || []), ...nc.tags])] : merged[existingIndex].tags,
              lastContactTimestamp: nc.lastContactTimestamp || merged[existingIndex].lastContactTimestamp
            };
          }
        } else if (cleanPhone.length >= 10) {
          // Se não existe, cria novo
          merged.push({
            id: `c-sync-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: nc.name,
            phone: nc.phone,
            type: 'PF',
            ltv: 0,
            tags: nc.tags || [],
            lastContactTimestamp: nc.lastContactTimestamp
          });
        }
      }
      return merged;
    });
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  const clearAllCustomers = () => {
    setCustomers([]);
    localStorage.removeItem('lavaos_customers');
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [transaction, ...prev]);
  };

  const setWhatsappConnected = (connected: boolean) => {
    setWhatsappConnectedState(connected);
    localStorage.setItem('lavaos_wpp_connected', connected.toString());
  };

  const requestWaPairingCode = (phone: string) => {
    setWaPairingError('');
    if (socketInstance) {
      socketInstance.emit('request_pairing_code', { phone });
    }
  };

  const addUser = (user: SystemUser) => {
    const newUsers = [...users, user];
    setUsers(newUsers);
    localStorage.setItem('lavaos_users', JSON.stringify(newUsers));
  };

  const deleteUser = (id: string) => {
    const newUsers = users.filter(u => u.id !== id);
    setUsers(newUsers);
    localStorage.setItem('lavaos_users', JSON.stringify(newUsers));
  };

  const login = (userLogin: string, pwd: string) => {
    const user = users.find(u => u.login === userLogin && u.pwd === pwd);
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem('lavaos_auth', 'true');
      localStorage.setItem('lavaos_current_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('lavaos_auth');
    localStorage.removeItem('lavaos_current_user');
  };

  const openCashRegister = (initialAmount: number) => {
    setCashRegisterStatus('open');
    setCashRegisterBalance(initialAmount);
    localStorage.setItem('lavaos_register_status', 'open');
    localStorage.setItem('lavaos_register_balance', initialAmount.toString());
  };

  const closeCashRegister = () => {
    setCashRegisterStatus('closed');
    setCashRegisterBalance(0);
    localStorage.setItem('lavaos_register_status', 'closed');
    localStorage.removeItem('lavaos_register_balance');
  };

  return (
    <GlobalContext.Provider value={{ 
      leads, addLead, updateLeadStatus, assumeChat, finishChat, addChatMessage, clearUnreadCount, wipeAllLeads,
      osCounter,
      orders, addOrder, updateOrderStatus, updateOrderItemPhoto, updateOrderStages, updateOrderPayment,
      companyInfo, updateCompanyInfo,
      lavaMindConfig, updateLavaMindConfig,
      catalogItems, addCatalogItem, removeCatalogItem,
      customers, addCustomer, updateCustomerTags, syncManyCustomers, deleteCustomer, clearAllCustomers,
      transactions, addTransaction,
      whatsappConnected: whatsappConnectedState, setWhatsappConnected: setWhatsappConnectedState, waQrCode, waPairingCode, waPairingError, requestWaPairingCode,
      users, addUser, deleteUser,
      isAuthenticated, currentUser, login, logout,
      cashRegisterStatus, cashRegisterBalance, openCashRegister, closeCashRegister,
      upcomingDates
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}
