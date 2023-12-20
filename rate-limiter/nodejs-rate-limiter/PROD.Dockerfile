FROM node:20 as builder

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application source code and build the app
COPY . .
RUN npm run build

# Stage 2: Create a lightweight production image
FROM node:20-alpine

WORKDIR /usr/app

# Use a non-root user for better security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
USER nodejs

# Copy only necessary files from the builder stage
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package*.json ./
COPY --from=builder /usr/app/dist ./dist

# Start Application
CMD ["node", "dist/main.js"]