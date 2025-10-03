# Baserow Upgrade Guide: 1.35.1 → 1.35.2

## Current Status Analysis
- **Your Version:** 1.35.1 (running for 2 weeks, healthy)
- **Latest Available:** 1.35.2 (released October 1, 2025)
- **Container Status:** Running 9 hours, port 80/tcp exposed

## Should You Upgrade? ✅ **YES - RECOMMENDED**

### Why Upgrade to 1.35.2?
- **Critical Performance Fix:** 1.35.2 fixes a performance problem when batch deleting rows that was introduced in 1.35.0
- **Stability Improvement:** Recommended by Baserow team as essential upgrade
- **Recent Release:** Only 2 days old, stable and tested

## Pre-Upgrade Checklist

### 1. Backup Your Data 🔒
```bash
# Stop Baserow container
docker stop baserow-vps-baserow-1

# Create backup of volumes
docker run --rm -v baserow-vps_baserow_data:/data -v $(pwd):/backup ubuntu tar czf /backup/baserow_backup_$(date +%Y%m%d_%H%M%S).tar.gz -C /data .

# Alternative: Database-specific backup if using external PostgreSQL
docker exec baserow-vps-baserow-1 pg_dump -U baserow baserow > baserow_db_backup_$(date +%Y%m%d_%H%M%S).sql
```

### 2. Note Current Configuration
```bash
# Check current docker-compose.yml
cat docker-compose.yml | grep baserow/baserow

# Check environment variables
docker inspect baserow-vps-baserow-1 | grep -A 20 "Env"
```

## Upgrade Steps

### Step 1: Update Docker Compose File
```yaml
# In your docker-compose.yml, change:
services:
  baserow:
    image: baserow/baserow:1.35.2  # Changed from 1.35.1
    # ... rest of your configuration remains same
```

### Step 2: Execute Upgrade
```bash
# Navigate to your compose directory
cd ~/baserow-vps  # or wherever your docker-compose.yml is

# Pull new image
docker-compose pull baserow

# Stop current container
docker-compose stop baserow

# Start with new version
docker-compose up -d baserow

# Check logs for successful startup
docker-compose logs -f baserow
```

### Step 3: Verify Upgrade
```bash
# Check container is running with new version
docker ps | grep baserow

# Check logs for "Baserow is now available" message
docker logs baserow-vps-baserow-1 | tail -20

# Test web interface access
curl -I http://localhost  # or your domain

# Verify API is responding
curl -I http://localhost/api/
```

## Rollback Plan (If Needed)

If something goes wrong, you can quickly rollback:

```bash
# Stop new version
docker-compose stop baserow

# Change docker-compose.yml back to:
# image: baserow/baserow:1.35.1

# Restore from backup if needed
docker run --rm -v baserow-vps_baserow_data:/data -v $(pwd):/backup ubuntu tar xzf /backup/baserow_backup_YYYYMMDD_HHMMSS.tar.gz -C /data

# Start old version
docker-compose up -d baserow
```

## Post-Upgrade Checklist

### 1. Functional Testing
- ✅ Web interface loads correctly
- ✅ All existing tables and data visible
- ✅ API endpoints responding
- ✅ File uploads working
- ✅ User authentication working
- ✅ Any integrations (n8n, etc.) still connected

### 2. Performance Monitoring
```bash
# Monitor resource usage
docker stats baserow-vps-baserow-1

# Check for any error logs
docker logs baserow-vps-baserow-1 | grep -i error
```

## Expected Downtime
- **Estimated:** 2-5 minutes
- **Actual Impact:** Brief interruption while container restarts
- **Best Time:** During low-usage period

## Compatibility Notes
- ✅ No breaking changes between 1.35.1 → 1.35.2
- ✅ Database schema remains compatible
- ✅ API endpoints unchanged
- ✅ Existing integrations will continue working

## What's Fixed in 1.35.2
- **Performance Issue:** Resolved batch row deletion performance problem
- **Stability:** Improved overall system stability
- **Bug Fixes:** Minor bug fixes and improvements

## Integration Impact
Since you're using Baserow with n8n and other services:
- **n8n Workflows:** No changes needed, API compatibility maintained
- **External Integrations:** Continue working without modification
- **Webhooks:** No reconfiguration required

## Monitoring After Upgrade
Keep an eye on:
- Container memory/CPU usage
- Response times for large operations
- Any new error patterns in logs
- Performance of batch operations (the specific fix area)

## Next Planned Upgrades
Looking ahead:
- Monitor for 1.36.x releases (likely in Nov-Dec 2025)
- Consider upgrading to newer major versions when available
- Keep eye on security advisories