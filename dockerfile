FROM node:14.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
RUN apk add yarn
ENV PATH $PATH:/opt/yarn/bin
COPY package.json ./
RUN yarn install
COPY . ./
RUN yarn run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]