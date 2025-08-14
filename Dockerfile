# Gunakan Node.js LTS
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json & lockfile
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy seluruh project
COPY . .

# Build Strapi
RUN npm run build

# Expose port Strapi default
EXPOSE 1337

# Jalankan Strapi
CMD ["npm", "run", "start"]
