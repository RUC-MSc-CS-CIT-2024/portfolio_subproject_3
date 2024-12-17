FROM node:20 AS build

WORKDIR /source
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx
LABEL org.opencontainers.image.source=https://github.com/RUC-MSc-CS-CIT-2024/portfolio_subproject_3

COPY --from=build /source/dist /usr/share/nginx/html

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 3030;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

CMD ["nginx", "-g", "daemon off;"]
