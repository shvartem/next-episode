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
- **Presenter** — вся JS-логика компонента (без JSX). Выносится в хук `use<Name>Presenter` в файле `Name/use<Name>Presenter.ts`.
- Presenter создаётся, только если у компонента есть логика. Компонент, который только раскладывает пропсы в JSX, хука не имеет.
- Presenter всегда оформляется как хук `use<Name>Presenter`, даже если внутри нет хуков React (только вычисления и обработчики). Это сделано намеренно: у всех компонентов единый контракт, и когда появятся состояние или эффекты, не придётся менять ни имя, ни View. Presenter вызывается на верхнем уровне компонента, как любой хук.
- Presenter принимает `props: Props`: у него тот же интерфейс, что у компонента. Компонент и Presenter импортируют `Props` из `./types`: `import type {Props} from './types';`.
- Компонент передаёт в Presenter `props` целиком: `use<Name>Presenter(props)`. Пропсы, которые Presenter не использует (например, `className` или `children`), он просто не деструктурирует. Если Presenter не использует ни одного пропса, он не принимает параметров и не импортирует `Props`, а компонент вызывает его без аргументов: `use<Name>Presenter()`.

Пример:

```
SearchForm/
├── SearchForm.tsx
├── SearchForm.module.css
├── types.ts
└── useSearchFormPresenter.ts
```

`types.ts`:

```ts
export interface Props {
    className?: string;
    onSubmit: (search: string) => void;
}
```

`SearchForm.tsx`:

```tsx
import clsx from 'clsx';

import type {Props} from './types';
import {useSearchFormPresenter} from './useSearchFormPresenter';

import styles from './SearchForm.module.css';

export const SearchForm = (props: Props) => {
    const {className} = props;

    const {search, handleChange, handleSubmit} = useSearchFormPresenter(props);

    return (
        <form className={clsx(styles.root, className)} onSubmit={handleSubmit}>
            <input value={search} onChange={handleChange} />
        </form>
    );
};
```

`useSearchFormPresenter.ts`:

```ts
import {useState} from 'react';

import type {Props} from './types';

export const useSearchFormPresenter = (props: Props) => {
    const {onSubmit} = props;

    const [search, setSearch] = useState('');

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(evt.target.value);
        onSubmit(evt.target.value);
    };

    const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
    };

    return {search, handleChange, handleSubmit};
};
```
