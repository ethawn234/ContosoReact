import { lazy } from 'react';

import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './context'

const TextField = lazy(() => 
    import('./fieldComponents')
    .then(m => ({ default: m.TextField }))
);

const RadioField = lazy(() =>
    import('./fieldComponents')
    .then(m => ({ default: m.RadioField }))
);

const NumberField = lazy(() =>
    import('./fieldComponents')
    .then(m => ({ default: m.NumberField }))
)

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TextField,
        RadioField,
        NumberField
    },
    formComponents: {}
});