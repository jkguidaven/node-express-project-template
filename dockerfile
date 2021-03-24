FROM node:latest

# switch app directory
WORKDIR /usr/app

# Copy files app source
COPY . ./

# install dependencies based on lockfile
RUN npm install

# Build the app
RUN npm run build
RUN npm prune --production

EXPOSE 3000
CMD [ "node", "dist/app.js" ]
