# Gunakan Node.js 20
FROM node:20-alpine
 
# Set workdir di dalam container
WORKDIR /app
 
# Salin file dependency
COPY package.json package-lock.json* ./
 
# Install dependency
RUN npm install
 
# Salin seluruh project ke container
COPY . .
 
# Build aplikasi Next.js
RUN npm run build
 
# Expose port 3000
EXPOSE 4100
 
# Jalankan aplikasi dalam mode production
CMD ["npm", "start"]