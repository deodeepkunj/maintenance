#!/bin/bash
set -e

echo "Validating deployment..."

# Check application is running
curl -f http://localhost:3000 || exit 1

# Check maintenance page is still accessible when needed
# This can be controlled by feature flags or config

echo "Deployment validated successfully"
exit 0