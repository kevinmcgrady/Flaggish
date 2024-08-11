import { Check } from 'lucide-react';

import { PlanType } from '@/core/plans';

type PricingSectionProps = {
  plans: PlanType[];
};

export const PricingSection = ({ plans }: PricingSectionProps) => {
  return (
    <section id='pricing' className='py-32'>
      <div className='container'>
        <div className='mb-12'>
          <h2 className='text-5xl text-center font-bold text-gray-900 mb-4'>
            Pricing
          </h2>
          <p className='text-gray-500 text-center leading-6 mb-9'>
            Choose the plan that best suits your project
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-8 justify-center'>
          {plans.map((plan) => (
            <div
              key={plan.title}
              className='text-gray-900 rounded-2xl bg-gray-50 p-6 transition-all duration-500 hover:bg-gray-100'
            >
              <h3 className='text-2xl font-bold mb-3'>{plan.title}</h3>
              <div className='flex items-center mb-6'>
                <span className='mr-2 text-6xl font-semibold'>
                  {plan.price}
                </span>
                <span className='text-xl text-gray-500 '>/ month</span>
              </div>

              <ul className='mb-12 space-y-6 text-left text-lg text-gray-500'>
                {plan.features.map((feature) => (
                  <li key={feature} className='flex items-center space-x-4'>
                    <Check size={25} className='text-emerald-500' />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
