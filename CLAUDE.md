# Правила проекта

## Стек

- React
- TypeScript в режиме strict
- CSS Modules

## Структура компонентов

- Компонент `Name` лежит в одноимённой папке: `Name/Name.tsx`.
- Интерфейс, типизирующий пропсы компонента, называется `Props`.
- Стили компонента лежат в той же папке в файле `Name/Name.module.css`.
- Если компонент A зависит от компонента B, то B лежит в папке A: `A/B/B.tsx`.
- Переиспользуемые компоненты лежат в папках `components/`. Уровень вложенности такой папки определяется местами использования компонента: компоненты ниже по дереву его используют, компоненты выше по дереву — нет. То есть папка `components/` создаётся в ближайшем общем предке всех мест использования.

## View и Presenter

- **View** — JSX компонента.
- **Presenter** — вся JS-логика компонента (без JSX). Выносится в хук с именем компонента: `use<Name>` в файле `Name/use<Name>.ts`.
- Presenter создаётся, только если у компонента есть логика. Компонент, который только раскладывает пропсы в JSX, хука не имеет.
- Presenter всегда оформляется как хук `use<Name>`, даже если внутри нет хуков React (только вычисления и обработчики). Это сделано намеренно: у всех компонентов единый контракт, и когда появятся состояние или эффекты, не придётся менять ни имя, ни View. Presenter вызывается на верхнем уровне компонента, как любой хук.
- В Presenter передаются все пропсы компонента. Исключение: `className` и `children` можно не передавать, если Presenter с ними не работает.

Пример:

```
SearchForm/
├── SearchForm.tsx
├── SearchForm.module.css
└── useSearchForm.ts
```

```tsx
import clsx from 'clsx';

import {useSearchForm} from './useSearchForm';

import styles from './SearchForm.module.css';

interface Props {
    className?: string;
    onSubmit: (search: string) => void;
}

export const SearchForm = (props: Props) => {
    const {className, ...restProps} = props;

    const {search, handleChange, handleSubmit} = useSearchForm(restProps);

    return (
        <form className={clsx(styles.root, className)} onSubmit={handleSubmit}>
            <input value={search} onChange={handleChange} />
        </form>
    );
};
```
