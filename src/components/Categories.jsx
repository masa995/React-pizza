import { React, useState, memo } from 'react'

function Categories({ items, onClickItem }) {

  const [activeItem, setActiveItem] = useState(null);

  const selectItem = (index) => {
    setActiveItem(index);
    onClickItem(index);
  }

  return (
    <div className="categories">
      <ul>
        <li
          onClick={() => { selectItem(null) }}
          className={activeItem === null ? "active" : ""}
        >
          Все</li>
        {items.map((name, index) => (
          items &&
          <li
            className={activeItem === index ? "active" : ""}
            key={`${name}_${index}`}
            onClick={() => selectItem(index)}
          //Если просто написать onClick={onClick(name)}, то функция сразу выполнится при рендере компонента, а за тем не будет выполнятся
          //() => {} - каждый раз когда перерендыревается элемент создается новая анонимная функция
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// React.memo является компонентом более высокого порядка.

// Если ваш компонент отображает тот же результат с использованием тех же пропсов, вы можете обернуть его в вызов React.memo для повышения производительности в некоторых случаях путем запоминания результата.

export default memo(Categories)