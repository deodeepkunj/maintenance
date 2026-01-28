set -e

echo "Enabling maintenance mode..."

# Set environment variable
export MAINTENANCE_MODE=true
export NEXT_PUBLIC_MAINTENANCE_MODE=true
export NEXT_PUBLIC_MAINTENANCE_DURATION=30

# Restart application
systemctl stop maintenance-screen || true
sleep 2

# Alternatively, for container-based deployment:
# docker update --env-file=/etc/maintenance-screen/.env maintenance-screen
# docker restart maintenance-screen

echo "Maintenance mode enabled"
exit 0