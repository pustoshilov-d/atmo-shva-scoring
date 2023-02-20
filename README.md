Первый запуск
```
git clone git@github.com:pustoshilov-d/atmo-shva-scoring.git
yarn install
```

Залить свои изменения на github
```
git add .
git commit -m "message"
git push
```

Залить изменения других с github
```
git pull
```

Запуск на dev
```
yarn start

#Второй терминал
yarn run tunnel 
# даст ссылку, которую в Настройках аппа в ВК надо в тест vk.com url вставить
```

Деплой prod
```
yarn build
yarn deploy
# в ВК пришлёт код, ссылки вставит сам
```