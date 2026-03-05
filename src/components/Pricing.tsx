import { Check, Building2, ArrowLeft, Sparkles, Rocket, Zap } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
}

export function Pricing({ onBack }: PricingProps) {
  const plans = [
    {
      name: 'Free',
      icon: Zap,
      price: '$0',
      period: 'para siempre',
      description: 'Perfecto para equipos pequeños comenzando',
      color: 'gray',
      buttonText: 'Comenzar',
      buttonStyle: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      features: [
        'Hasta 5 ofertas de trabajo activas',
        'Hasta 50 candidatos por mes',
        'Seguimiento básico de candidatos',
        'Notificaciones por email',
        '1 cuenta de usuario',
      ]
    },
    {
      name: 'Professional',
      icon: Sparkles,
      price: '$99',
      period: 'por mes',
      description: 'Para empresas en crecimiento con necesidades de contratación',
      color: 'indigo',
      popular: true,
      buttonText: 'Iniciar Prueba Gratis',
      buttonStyle: 'bg-indigo-600 text-white hover:bg-indigo-700',
      features: [
        'Ofertas de trabajo ilimitadas',
        'Candidatos ilimitados',
        'Suite completa de pruebas psicométricas',
        'Analíticas y reportes avanzados',
        'Hasta 10 cuentas de usuario',
        'Personalización de marca',
      ]
    },
    {
      name: 'Enterprise',
      icon: Rocket,
      price: 'Personalizado',
      period: 'contáctanos',
      description: 'Para organizaciones grandes con necesidades complejas',
      color: 'purple',
      buttonText: 'Contactar Ventas',
      buttonStyle: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50',
      features: [
        'Todo lo de Professional',
        'Cuentas de usuario ilimitadas',
        'Gerente de cuenta dedicado',
        'Soporte prioritario 24/7',
        'Integraciones personalizadas (API)',
        'Solución white-label',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al login
          </button>
          
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl mb-4">
            <Building2 className="w-7 h-7 text-white" />
          </div>
          
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">Elige Tu Plan</h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Comienza a contratar de manera inteligente. Elige el plan que se ajuste a tus necesidades.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-xl border-2 shadow-md transition-all hover:shadow-lg ${
                  plan.popular 
                    ? 'border-indigo-600 md:scale-105' 
                    : 'border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className="p-6">
                  {/* Plan Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      plan.color === 'indigo' ? 'bg-indigo-100' :
                      plan.color === 'purple' ? 'bg-purple-100' :
                      'bg-gray-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        plan.color === 'indigo' ? 'text-indigo-600' :
                        plan.color === 'purple' ? 'text-purple-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                    </div>
                  </div>

                  <p className="text-xs text-gray-600 mb-4">{plan.description}</p>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && (
                        <span className="text-xs text-gray-500">/ {plan.period}</span>
                      )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-all mb-5 ${plan.buttonStyle}`}>
                    {plan.buttonText}
                  </button>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Qué incluye</p>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          plan.color === 'indigo' ? 'bg-indigo-100' :
                          plan.color === 'purple' ? 'bg-purple-100' :
                          'bg-gray-100'
                        }`}>
                          <Check className={`w-2.5 h-2.5 ${
                            plan.color === 'indigo' ? 'text-indigo-600' :
                            plan.color === 'purple' ? 'text-purple-600' :
                            'text-gray-600'
                          }`} />
                        </div>
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            ¿Necesitas ayuda eligiendo un plan?{' '}
            <button className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              Contacta a nuestro equipo de ventas
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
