Получение cli для орм библиотеки. Берет из корня нод модулей
```shell
"typeorm": "node --require ts-node/register ./node_modules/typeorm/cli.js",
```

Выведение для настройки от дата соурс бд
```shell
"typeorm:config": "npm run typeorm -- -d ./libs/providers/src/typeorm/typeorm.config.ts",
```

Для запуска миграции в бд
```shell
"migration:run": "npm run migration:compile && npm run typeorm:config migration:run",
```

Создание миграции в sql виде, для будущего insert в бд
```shell
"migration:generate": "nest build entities --tsc && cross-env npm run typeorm:config migration:generate ./migrations/%npm_config_name%_migration",
```

```shell
"migration:compile": "tsc -p ./migrations/tsconfig.migration.json",
```

Создание пустой миграции
```shell
"migration:create": "cross-env npm run typeorm migration:create ./migrations/%npm_config_name%_migration",
```

Октат до последней миграции
```shell
"migration:revert": "npm run typeorm:config migration:revert"
```
