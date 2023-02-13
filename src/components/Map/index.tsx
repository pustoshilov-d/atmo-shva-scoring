import React from "react";

type Props = {};

export class MapTemplateProvider extends React.Component {
  constructor() {
    // @ts-ignore
    super();
    this.state = {
      template: null,
      iconTemplate: null,
      iconShape: null,
      ready: false,
    };
  }

  componentDidMount() {
    // Ждём загрузки модуля
    const interval = setInterval(() => {
    // @ts-ignore
      if (!this.state.ready) {
        // Когда загрузился модуль
        // @ts-ignore
        if (this.props.ymaps.hasOwnProperty("Map")) {
          const MyBalloonContentLayout =
          // @ts-ignore
            this.props.ymaps.templateLayoutFactory.createClass(
              '<div class="popover-content">$[properties.content]</div>'
            );

          // Сохранение контекста в другой переменной, чтобы в другом контексте вызвать setState
          const _this = this;

          let shape; // Так надо

          // Создание макета иконки
          const iconContentLayout =
          // @ts-ignore
            this.props.ymaps.templateLayoutFactory.createClass(
              '<a class="tooltiptext">$[properties.title]</a>',
              {
                // Функция, собирающая макет
                build: async function () {
                  this.constructor.superclass.build.call(this);

                  // Подсчёт размеров
                  this._element.classList.add("tooltip");
                  const height = this._element.clientHeight + 3;
                  shape = [
                    [-60, 0],
                    [60, -height],
                  ];
                  _this.setState({ iconShape: shape });
                },
                clear: function () {
                  this.constructor.superclass.clear.call(this);
                },
              }
            );

          _this.setState({
            template: MyBalloonContentLayout,
            iconTemplate: iconContentLayout,
            ready: false,
          });

          clearInterval(interval);
        }
      }
    }, 300);
  }

  render() {
    // @ts-ignore
    return this.props.children({
      // @ts-ignore
      template: this.state.template,
      // @ts-ignore
      iconTemplate: this.state.iconTemplate,
      // @ts-ignore
      iconShape: this.state.iconShape,
    });
  }
}