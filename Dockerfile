ARG base_image=node:20-alpine

FROM ${base_image} as build

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
WORKDIR /app
COPY package*.json ./
RUN npm install && npm audit fix --force

FROM ${base_image}

WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY . ./
EXPOSE 3000

CMD [ "npm","start" ]