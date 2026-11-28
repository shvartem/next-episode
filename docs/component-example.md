# Пример компонента

Абстрактный компонент, не из проекта:

```text
Counter/
├── Counter.tsx
├── Counter.module.css
├── types.ts
└── logic/
    └── useCounter.ts
```

`types.ts`:

```ts
export interface Props {
    className?: string;
    initialValue: number;
    onChange: (value: number) => void;
}
```

`Counter.tsx`:

```tsx
import clsx from 'clsx';

import type {Props} from './types';
import {useCounter} from './logic/useCounter';

import styles from './Counter.module.css';

export const Counter = (props: Props) => {
    const {className} = props;

    const {value, handleIncrement} = useCounter(props);

    return (
        <div className={clsx(styles.root, className)}>
            <span>{value}</span>
            <button type="button" onClick={handleIncrement}>
                +1
            </button>
        </div>
    );
};
```

`logic/useCounter.ts`:

```ts
import {useState} from 'react';

import type {Props} from '../types';

export const useCounter = (props: Props) => {
    const {initialValue, onChange} = props;

    const [value, setValue] = useState(initialValue);

    const handleIncrement = () => {
        const nextValue = value + 1;

        setValue(nextValue);
        onChange(nextValue);
    };

    return {value, handleIncrement};
};
```
