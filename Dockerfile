###################
# BUILD FOR PRODUCTION
###################

FROM node:16-slim As build

WORKDIR /usr/src/app

COPY package.json    ./
COPY ./src ./src
COPY ./nest-cli.json ./
COPY ./tsconfig.build.json ./
COPY ./tsconfig.json ./

RUN npm install -g @nestjs/cli
RUN npm install husky -g

# Set NODE_ENV environment variable

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


# Install app dependencies using the `npm ci` command instead of `npm install`
# RUN npm install
RUN npm install

# RUN git submodule update --init --recursive

RUN npm run build

ENV PORT 3000

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]
