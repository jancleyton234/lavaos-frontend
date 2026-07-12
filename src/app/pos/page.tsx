import { redirect } from 'next/navigation';

export default function PosRedirect() {
  // O PDV agora é a Central Operacional (Home /). Redirecionando para evitar duplicação.
  redirect('/');
}
