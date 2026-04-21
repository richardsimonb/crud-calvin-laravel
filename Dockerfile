FROM dhi.io/composer:2.9 as composer

COPY composer.json .

RUN composer install --no-dev --prefer-dist --optimize-autoloader

FROM dunglas/frankenphp as app

RUN install-php-extensions \
	pdo_pgsql

COPY . .
COPY --from=composer /app/vendor /app/vendor

ENV SERVER_NAME=:80