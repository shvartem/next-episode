# Правила проекта

## Стек

- React
- TypeScript в режиме strict
- CSS Modules

## Структура компонентов

- Компонент `Name` лежит в одноимённой папке: `Name/Name.tsx`.
- Интерфейс, типизирующий пропсы компонента, называется `Props` и экспортируется из файла `Name/types.ts` рядом с компонентом. Там же лежат другие типы, относящиеся к компоненту (например, тип элемента списка, который компонент принимает в пропсах).
- Компонент без пропсов файла `types.ts` не имеет.
- Стили компонента лежат в той же папке в файле `Name/Name.module.css`.
- Если компонент A зависит от компонента B, то B лежит в папке A: `A/B/B.tsx`.
- Переиспользуемые компоненты лежат в папках `components/`. Уровень вложенности такой папки определяется местами использования компонента: компоненты ниже по дереву его используют, компоненты выше по дереву — нет. То есть папка `components/` создаётся в ближайшем общем предке всех мест использования.

## View и Presenter

- **View** — JSX компонента.
- **Presenter** — вся JS-логика компонента (без JSX). Выносится в хук `use<Name>` в файле `Name/use<Name>.ts`.
- Presenter создаётся, только если у компонента есть логика. Компонент, который только раскладывает пропсы в JSX, хука не имеет.
- **Логика** — всё, что вычисляет или меняет данные, а не просто выводит их:
  - хуки React: состояние, эффекты, ref, контекст, мемоизация;
  - обработчики событий и другие функции, объявленные в компоненте (кроме render-функций, см. ниже);
  - вычисления над данными: фильтрация, сортировка, форматирование, сборка строк, производные флаги (`isVisible`, `hasList`).
- **Не логика** (остаётся во View):
  - передача пропсов и значений из Presenter в разметку;
  - условный рендер и `.map` по уже готовым флагам и массивам;
  - сборка классов через `clsx` и простые выражения в атрибутах по готовому значению (`aria-current={item.isCurrent ? 'page' : undefined}`);
  - render-функции внутри компонента, которые только выбирают и возвращают JSX по готовым флагам, например:
    ```tsx
    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }

        return <List items={items} />;
    };
    ```
- Presenter всегда оформляется как хук `use<Name>`, даже если внутри нет хуков React (только вычисления и обработчики). Это сделано намеренно: у всех компонентов единый контракт, и когда появятся состояние или эффекты, не придётся менять ни имя, ни View. Presenter вызывается на верхнем уровне компонента, как любой хук.
- Presenter принимает `props: Props`: у него тот же интерфейс, что у компонента. Компонент и Presenter импортируют `Props` из `./types`: `import type {Props} from './types';`.
- Компонент передаёт в Presenter `props` целиком: `use<Name>(props)`. Пропсы, которые Presenter не использует (например, `className` или `children`), он просто не деструктурирует. Если Presenter не использует ни одного пропса, он не принимает параметров и не импортирует `Props`, а компонент вызывает его без аргументов: `use<Name>()`.

Пример (абстрактный компонент, не из проекта):

```
Counter/
├── Counter.tsx
├── Counter.module.css
├── types.ts
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
import {useCounter} from './useCounter';

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

`useCounter.ts`:

```ts
import {useState} from 'react';

import type {Props} from './types';

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

## Размер файлов и линтер

- Файл — не больше 120 строк (проверяет ESLint `max-lines`). Если файл разрастается, выносить части по правилам структуры выше: подкомпоненты в дочерние папки, логику в Presenter, типы в `types.ts`. Не сжимать код ради лимита.
- После изменений запускать `npm run lint` и исправлять ошибки.

## Karpathy Guidelines

@.claude/karpathy-guidelines.md
