FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    git unzip curl libpq-dev libonig-dev libzip-dev zip \
    && docker-php-ext-install pdo pdo_mysql pdo_pgsql mbstring zip

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy project
COPY . .

# Install Laravel deps
RUN composer install --no-dev --optimize-autoloader

# Build frontend
RUN npm install && npm run build

# Fix permissions
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

# 🔥 RUN EVERYTHING HERE (NOT IN BUILD)
CMD php artisan config:clear && \
    php artisan cache:clear && \
    php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache && \
    php artisan storage:link && \
    php artisan migrate:fresh --force && \
    php artisan migrate:fresh --seed --force && \
    php artisan serve --host=0.0.0.0 --port=10000