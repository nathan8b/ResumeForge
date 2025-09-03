# Start with minimal TeX Live base
FROM debian:bookworm-slim

# Install only the packages needed for resume
RUN apt-get update && apt-get install -y \
    texlive-latex-base \
    texlive-latex-recommended \
    texlive-latex-extra \
    texlive-fonts-recommended \
    texlive-lang-english \
    latexmk \
    ghostscript \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of your project
COPY . .

# Expose port for backend
EXPOSE 5000

# Start server
CMD ["node", "index.js"]

