FROM composer:2.9.7 AS composer

WORKDIR /app

COPY composer.* ./

RUN composer install --no-scripts --prefer-dist --optimize-autoloader

FROM node:22-alpine AS node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM dunglas/frankenphp AS app

RUN install-php-extensions \
	pdo_pgsql

COPY . /app
COPY --from=composer /app/vendor /app/vendor
COPY --from=node /app/public /app/public
COPY --from=node /app/node_modules /app/node_modules

RUN php artisan key:generate

ENV SERVER_NAME=:80


