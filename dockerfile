FROM node:14.15.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add yarn
ENV PATH $PATH:/opt/yarn/bin
COPY frontend/package.json ./
RUN yarn install
COPY frontend/. ./
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# install kubectl
RUN curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/local/bin/kubectl

# running
WORKDIR /app
ADD start.sh /
RUN chmod +x /start.sh

EXPOSE 80
CMD ["/start.sh"]
