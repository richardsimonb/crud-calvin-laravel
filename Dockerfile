FROM composer:2.9.7 AS composer

WORKDIR /app

COPY composer.* ./

RUN composer install --no-scripts --prefer-dist --optimize-autoloader

FROM dunglas/frankenphp AS app

RUN install-php-extensions \
	pdo_pgsql

COPY . /app
COPY --from=composer /app/vendor /app/vendor

ENV SERVER_NAME=:80