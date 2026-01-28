#!/bin/bash
set -e

echo "Disabling maintenance mode..."

# Unset environment variable
export MAINTENANCE_MODE=false
export NEXT_PUBLIC_MAINTENANCE_MODE=false

# Restart application
systemctl start maintenance-screen

# For containers:
# docker update --env-file=/etc/maintenance-screen/.env maintenance-screen
# docker restart maintenance-screen

# Verify service is healthy
sleep 5
curl -f http://localhost:3000/api/health || exit 1

echo "Maintenance mode disabled"
exit 0