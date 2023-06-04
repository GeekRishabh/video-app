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

RUN wget https://www.johnvansickle.com/ffmpeg/old-releases/ffmpeg-4.4.1-arm64-static.tar.xz &&\
    tar xvf ffmpeg-4.4.1-arm64-static.tar.xz &&\
    mv ffmpeg-4.4.1-arm64-static/ffmpeg /usr/bin/ &&\
    mv ffmpeg-4.4.1-arm64-static/ffprobe /usr/bin/ 
#RUN apt install -y ffmpeg

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
