<p align="center" style="font-size: 32px">Bot - template for DDD and CQRS architecture</p>

<div align="center">
  <a href="https://nestjs.org">
    <img src="https://www.freedownloadlogo.com/logos/n/nestjs.svg" alt="Logo" width="200" height="150">
  </a>
</div>

<div align="center"> 

[![Nest][Nest.js]][Nest-url] [![Telegraf][Telegraf.js]][Telegraf-url] [![TypeScript][TypeScriptIo]][TypeScriptUrl] [![Eslint][EslintIo]][EslintUrl] [![Prettier][PrettierIo]][PrettierUrl]

</div>


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

[Nest.js]: https://img.shields.io/badge/nest.js-ffffff?style=for-the-badge&logo=nestjs&logoColor=red
[Nest-url]: https://nestjs.com/
[Telegraf.js]: https://img.shields.io/badge/telegraf-20232A?style=for-the-badge&logo=telegraf&logoColor=61DAFB
[Telegraf-url]: https://reactjs.org/
[TypeScriptIo]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScriptUrl]: https://www.typescriptlang.org
[EslintIo]: https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white
[EslintUrl]: https://eslint.org/
[PrettierIo]: https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E
[PrettierUrl]: https://prettier.io/