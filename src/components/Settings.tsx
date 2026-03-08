import { Building2, Users, CreditCard, Link2, Save } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api, isApiEnabled } from '../api/client';

type Plan = {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  currency: string;
  billing_interval: string;
  max_positions: number | null;
  max_candidates_per_month: number | null;
  features: string[];
};

type EmpresaWithPlan = {
  id: number;
  name: string;
  slug: string | null;
  industry: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  plan_id: number | null;
  plan: Plan | null;
};

type UserWithEmpresa = {
  id: number;
  name: string;
  email: string;
  empresa_id: number | null;
  empresa: EmpresaWithPlan | null;
};

type UsuarioEmpresa = {
  id: number;
  name: string;
  email: string;
  created_at: string;
};

export function Settings() {
  const [activeTab, setActiveTab] = useState('company');
  const [user, setUser] = useState<UserWithEmpresa | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [companyLoading, setCompanyLoading] = useState(false);
  const [companySaving, setCompanySaving] = useState(false);
  const [companyMessage, setCompanyMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [companyLoadError, setCompanyLoadError] = useState<string | null>(null);
  const [companyForm, setCompanyForm] = useState({
    name: '',
    industry: '',
    website: '',
    email: '',
    phone: '',
    address: '',
  });
  const [companyUsers, setCompanyUsers] = useState<UsuarioEmpresa[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [showInviteUser, setShowInviteUser] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
  const [inviteSaving, setInviteSaving] = useState(false);
  const [inviteMessage, setInviteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (user?.empresa) {
      setCompanyForm({
        name: user.empresa.name ?? '',
        industry: user.empresa.industry ?? '',
        website: user.empresa.website ?? '',
        email: user.empresa.email ?? '',
        phone: user.empresa.phone ?? '',
        address: user.empresa.address ?? '',
      });
    }
  }, [user?.empresa?.id]);

  useEffect(() => {
    if (!isApiEnabled()) return;
    if (activeTab === 'company') {
      setCompanyLoading(true);
      setCompanyLoadError(null);
      api.get<UserWithEmpresa>('/user')
        .then((data) => {
          setUser(data);
          setCompanyLoadError(null);
        })
        .catch((err) => {
          setCompanyLoadError(err instanceof Error ? err.message : 'Error al cargar los datos');
        })
        .finally(() => setCompanyLoading(false));
    } else if (activeTab === 'subscription') {
      setSubscriptionLoading(true);
      Promise.all([
        api.get<UserWithEmpresa>('/user'),
        api.get<Plan[]>('/plans'),
      ])
        .then(([userRes, plansRes]) => {
          setUser(userRes);
          setPlans(plansRes ?? []);
        })
        .catch(() => {})
        .finally(() => setSubscriptionLoading(false));
    } else if (activeTab === 'users') {
      setUsersLoading(true);
      api.get<UsuarioEmpresa[]>('/empresa/usuarios')
        .then(setCompanyUsers)
        .catch(() => setCompanyUsers([]))
        .finally(() => setUsersLoading(false));
    }
  }, [activeTab]);

  const handleSaveCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.empresa || !isApiEnabled()) return;
    setCompanyMessage(null);
    setCompanySaving(true);
    try {
      await api.put('/empresa', companyForm);
      setCompanyMessage({ type: 'success', text: 'Empresa actualizada correctamente.' });
      const updated = await api.get<UserWithEmpresa>('/user');
      setUser(updated);
    } catch (err) {
      setCompanyMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Error al guardar. Intenta de nuevo.',
      });
    } finally {
      setCompanySaving(false);
    }
  };

  const handleInviteUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviteMessage(null);
    setInviteSaving(true);
    try {
      await api.post('/empresa/usuarios', inviteForm);
      setInviteMessage({ type: 'success', text: 'Usuario agregado correctamente.' });
      setInviteForm({ name: '', email: '', password: '', password_confirmation: '' });
      setShowInviteUser(false);
      const list = await api.get<UsuarioEmpresa[]>('/empresa/usuarios');
      setCompanyUsers(list);
    } catch (err) {
      setInviteMessage({
        type: 'error',
        text: err instanceof Error ? err.message : 'Error al agregar usuario.',
      });
    } finally {
      setInviteSaving(false);
    }
  };

  const currentPlan =
    user?.empresa?.plan ??
    (user?.empresa?.plan_id != null ? plans.find((p) => p.id === user.empresa!.plan_id) ?? null : null);

  const tabs = [
    { id: 'company', label: 'Perfil de empresa', icon: Building2 },
    { id: 'users', label: 'Usuarios de la empresa', icon: Users },
    { id: 'subscription', label: 'Plan de suscripción', icon: CreditCard },
    { id: 'integrations', label: 'Integraciones', icon: Link2 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-semibold text-gray-900 mb-1">Configuración</h1>
        <p className="text-sm text-gray-600">Gestiona tu cuenta y preferencias de la aplicación</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'company' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-6">Información de la empresa</h3>
          {companyLoading ? (
            <div className="py-8 text-center text-gray-500">Cargando información de la empresa...</div>
          ) : companyLoadError ? (
            <div className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-3">
              <p className="font-medium">Error al cargar</p>
              <p className="text-sm mt-1">{companyLoadError}</p>
              <p className="text-sm mt-2">Comprueba que el backend esté en marcha (php artisan serve) y que hayas iniciado sesión con un usuario que tenga empresa asignada.</p>
            </div>
          ) : user?.empresa ? (
            <form onSubmit={handleSaveCompany} className="space-y-4 max-w-2xl">
              {companyMessage && (
                <div className={`rounded-lg px-4 py-2 text-sm ${companyMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                  {companyMessage.text}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa</label>
                  <input type="text" value={companyForm.name} onChange={(e) => setCompanyForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industria</label>
                  <select value={companyForm.industry} onChange={(e) => setCompanyForm((f) => ({ ...f, industry: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Seleccionar...</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
                <input type="url" value={companyForm.website} onChange={(e) => setCompanyForm((f) => ({ ...f, website: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email de la empresa</label>
                <input type="email" value={companyForm.email} onChange={(e) => setCompanyForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <input type="tel" value={companyForm.phone} onChange={(e) => setCompanyForm((f) => ({ ...f, phone: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                <textarea rows={3} value={companyForm.address} onChange={(e) => setCompanyForm((f) => ({ ...f, address: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="pt-4">
                <button type="submit" disabled={companySaving} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm disabled:opacity-50">
                  <Save className="w-4 h-4" />
                  {companySaving ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </form>
          ) : isApiEnabled() ? (
            <div className="rounded-lg bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3">
              <p className="font-medium">No tienes una empresa asignada</p>
              <p className="text-sm mt-1">Tu usuario no tiene empresa_id en la base de datos. Cierra sesión, asigna en la tabla users el campo empresa_id = 1 a tu usuario (o contacta al administrador) y vuelve a iniciar sesión.</p>
            </div>
          ) : (
            <p className="text-gray-500">Conecta la API para ver y editar la información de tu empresa.</p>
          )}
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Usuarios de la empresa</h3>
            {isApiEnabled() && (
              <button type="button" onClick={() => { setShowInviteUser(true); setInviteMessage(null); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm">
                Invitar usuario
              </button>
            )}
          </div>
          <div className="p-6">
            {usersLoading ? (
              <div className="py-8 text-center text-gray-500">Cargando usuarios...</div>
            ) : !isApiEnabled() ? (
              <p className="text-gray-500">Conecta la API para ver los usuarios de tu empresa.</p>
            ) : companyUsers.length === 0 ? (
              <p className="text-gray-500">No hay usuarios en tu empresa. Invita a alguien para comenzar.</p>
            ) : (
              <div className="space-y-4">
                {companyUsers.map((usuario) => (
                  <div key={usuario.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-medium text-sm">
                        {usuario.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{usuario.name}</div>
                        <div className="text-xs text-gray-500">{usuario.email}</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">Activo</span>
                  </div>
                ))}
              </div>
            )}
            {showInviteUser && isApiEnabled() && (
              <div className="mt-6 p-6 border border-gray-200 rounded-xl bg-gray-50">
                <h4 className="font-medium text-gray-900 mb-4">Agregar usuario a la empresa</h4>
                <form onSubmit={handleInviteUser} className="space-y-4 max-w-md">
                  {inviteMessage && (
                    <div className={`rounded-lg px-4 py-2 text-sm ${inviteMessage.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>{inviteMessage.text}</div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                    <input type="text" required value={inviteForm.name} onChange={(e) => setInviteForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" required value={inviteForm.email} onChange={(e) => setInviteForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                    <input type="password" required value={inviteForm.password} onChange={(e) => setInviteForm((f) => ({ ...f, password: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                    <input type="password" required value={inviteForm.password_confirmation} onChange={(e) => setInviteForm((f) => ({ ...f, password_confirmation: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="flex gap-2">
                    <button type="submit" disabled={inviteSaving} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium text-sm disabled:opacity-50">{inviteSaving ? 'Guardando...' : 'Agregar usuario'}</button>
                    <button type="button" onClick={() => { setShowInviteUser(false); setInviteMessage(null); setInviteForm({ name: '', email: '', password: '', password_confirmation: '' }); }} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">Cancelar</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'subscription' && (
        <div className="space-y-6">
          {subscriptionLoading ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">Cargando plan...</div>
          ) : (
            <>
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Plan actual</h3>
                {currentPlan ? (
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-gray-900 mb-1">{currentPlan.name}</div>
                      {currentPlan.description && <div className="text-gray-600 mb-4">{currentPlan.description}</div>}
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-4xl font-bold text-gray-900">{currentPlan.currency === 'USD' ? '$' : currentPlan.currency}{currentPlan.price}</span>
                        <span className="text-gray-600">/{currentPlan.billing_interval === 'yearly' ? 'año' : 'mes'}</span>
                      </div>
                      {(currentPlan.max_positions != null || currentPlan.max_candidates_per_month != null) && (
                        <div className="text-sm text-gray-600">
                          {currentPlan.max_positions != null && <span>Hasta {currentPlan.max_positions} vacantes activas</span>}
                          {currentPlan.max_positions != null && currentPlan.max_candidates_per_month != null && ' · '}
                          {currentPlan.max_candidates_per_month != null && <span>{currentPlan.max_candidates_per_month} candidatos/mes</span>}
                        </div>
                      )}
                    </div>
                    <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">Gestionar facturación</button>
                  </div>
                ) : isApiEnabled() ? (
                  <p className="text-gray-500">Tu empresa no tiene un plan asignado. Contacta al administrador.</p>
                ) : (
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-2xl font-semibold text-gray-900 mb-1">Professional Plan</div>
                      <div className="text-gray-600 mb-4">Perfect for growing teams</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-gray-900">$99</span>
                        <span className="text-gray-600">/mes</span>
                      </div>
                    </div>
                    <button type="button" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium text-sm">Gestionar facturación</button>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(plans.length > 0 ? plans : [
                  { id: 1, name: 'Starter', price: 29, currency: 'USD', features: ['Up to 10 jobs', '100 candidates', 'Basic tests', 'Email support'] },
                  { id: 2, name: 'Professional', price: 99, currency: 'USD', features: ['Unlimited jobs', '1000 candidates', 'All tests', 'Priority support'] },
                  { id: 3, name: 'Enterprise', price: 299, currency: 'USD', features: ['Everything in Pro', 'Custom tests', 'API access', 'Dedicated manager'] }
                ]).map((plan) => {
                  const planIdEmpresa = user?.empresa?.plan_id;
                  const isCurrent = planIdEmpresa != null && 'id' in plan && plan.id === planIdEmpresa;
                  const features = 'features' in plan && Array.isArray(plan.features) ? plan.features : [];
                  const price = 'price' in plan ? plan.price : 0;
                  const currency = 'currency' in plan ? plan.currency : 'USD';
                  return (
                    <div key={'id' in plan ? plan.id : plan.name} className={`bg-white rounded-xl border-2 p-6 ${isCurrent ? 'border-indigo-600' : 'border-gray-200'}`}>
                      {isCurrent && <div className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium inline-block mb-4">Plan actual</div>}
                      <div className="font-semibold text-gray-900 mb-2">{'name' in plan ? plan.name : ''}</div>
                      <div className="text-3xl font-bold text-gray-900 mb-4">{currency === 'USD' ? '$' : ''}{price}<span className="text-base font-normal text-gray-600">/mes</span></div>
                      <ul className="space-y-2 mb-6">
                        {features.map((feature: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"><div className="w-2 h-2 bg-green-600 rounded-full" /></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button type="button" className={`w-full px-4 py-2 rounded-lg font-medium text-sm ${isCurrent ? 'bg-gray-100 text-gray-600 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
                        {isCurrent ? 'Plan actual' : 'Cambiar plan'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Integraciones disponibles</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Slack', description: 'Notificaciones en Slack', connected: true },
                { name: 'LinkedIn', description: 'Importar perfiles de candidatos', connected: true },
                { name: 'Google Calendar', description: 'Sincronizar entrevistas', connected: false },
                { name: 'Zoom', description: 'Entrevistas por video', connected: false },
                { name: 'Gmail', description: 'Enviar correos', connected: true },
                { name: 'Greenhouse', description: 'Sincronizar vacantes', connected: false }
              ].map((integration, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center"><Link2 className="w-5 h-5 text-gray-600" /></div>
                    <div>
                      <div className="font-medium text-sm text-gray-900">{integration.name}</div>
                      <div className="text-xs text-gray-500">{integration.description}</div>
                    </div>
                  </div>
                  <button type="button" className={`px-3 py-1 rounded-lg text-sm font-medium ${integration.connected ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                    {integration.connected ? 'Conectado' : 'Conectar'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
