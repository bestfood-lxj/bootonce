git clone https://github.com/firecrawl/firecrawl.git
cd firecrawl
cp apps/api/.env.example .env

cat << \
=========================================================================
USE_DB_AUTHENTICATION=false
PORT=3002
=========================================================================

docker compose up -d