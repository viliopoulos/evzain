# Fix Email Receiving - URGENT

## Problem
`performance@evzain.com` cannot receive emails because there are **no MX records** configured.

**Error**: "The recipient server did not accept our requests to connect"

---

## Solution: Resend Inbound (10 minutes)

### Step 1: Get MX Records from Resend (2 min)

1. Go to https://resend.com/domains
2. Click on `evzain.com`
3. Click **Inbound** tab (top navigation)
4. You'll see MX records like:
   ```
   Priority: 10
   Value: mx1.resend.com
   
   Priority: 20
   Value: mx2.resend.com
   ```
5. **Keep this tab open**

### Step 2: Add MX Records to Namecheap (3 min)

1. Log in to Namecheap
2. Domain List → `evzain.com` → **Manage**
3. **Advanced DNS** tab
4. Scroll to DNS records section
5. Click **ADD NEW RECORD**
6. Add first MX record:
   - Type: `MX Record`
   - Host: `@`
   - Value: `mx1.resend.com`
   - Priority: `10`
   - TTL: `Automatic`
7. Click **ADD NEW RECORD** again
8. Add second MX record:
   - Type: `MX Record`
   - Host: `@`
   - Value: `mx2.resend.com`
   - Priority: `20`
   - TTL: `Automatic`
9. Click **Save All Changes** (green checkmark at top right)

### Step 3: Create Forwarding Rule in Resend (2 min)

1. Back in Resend → Inbound tab
2. Click **Create Forwarding Rule** or **Add Rule**
3. Configure:
   - **Match**: `performance@evzain.com` (or use wildcard `*@evzain.com`)
   - **Forward to**: `viliopoulo@gmail.com`
4. Click **Create** or **Save**

### Step 4: Verify DNS Propagation (3 min)

Wait 2-3 minutes, then test:

```bash
dig MX evzain.com +short
```

Should show:
```
10 mx1.resend.com.
20 mx2.resend.com.
```

### Step 5: Test Email (1 min)

1. Send test email from your personal Gmail to `performance@evzain.com`
2. Check `viliopoulo@gmail.com` inbox
3. Should arrive within 1 minute

---

## Alternative: Namecheap Email Forwarding

If you prefer to use Namecheap's built-in forwarding:

### Step 1: Add Namecheap MX Records

In Namecheap Advanced DNS, add:

```
Type: MX Record
Host: @
Value: eforward1.registrar-servers.com
Priority: 10

Type: MX Record
Host: @
Value: eforward2.registrar-servers.com
Priority: 20

Type: MX Record
Host: @
Value: eforward3.registrar-servers.com
Priority: 30

Type: MX Record
Host: @
Value: eforward4.registrar-servers.com
Priority: 40
```

### Step 2: Enable Email Forwarding

1. In Namecheap, scroll to **Mail Settings** section
2. Toggle **Email Forwarding** to **ON**
3. Confirm `performance` → `viliopoulo@gmail.com` exists
4. Save changes

### Step 3: Wait 15 Minutes

Namecheap email forwarding takes longer to propagate.

---

## Troubleshooting

### "MX records not showing up"
- Wait 5-10 minutes for DNS propagation
- Clear DNS cache: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`
- Check again: `dig MX evzain.com +short`

### "Email still bouncing"
- Verify MX records are correct (no typos)
- Check Resend Inbound logs for errors
- Ensure forwarding rule is active

### "Forwarding not working"
- Check spam folder in `viliopoulo@gmail.com`
- Verify forwarding rule in Resend dashboard
- Test with different sender email

---

## For Your Pitch Tomorrow

Once email receiving works:

1. **Demo Flow**:
   - Show homepage → waitlist signup
   - Show email arrives in inbox
   - Show assessment → results
   - Show roadmap email delivery

2. **QR Code**:
   - Generate at https://qr.io or https://www.qr-code-generator.com
   - URL: `https://evzain.com`
   - Test scanning before pitch

3. **Backup Plan**:
   - If email still broken, focus on assessment flow
   - Show results page (works without email)
   - Mention "email automation in progress"

---

## Status Check

Run these commands to verify:

```bash
# Check MX records
dig MX evzain.com +short

# Check all DNS records
dig evzain.com ANY +short

# Test email delivery (after setup)
echo "Test" | mail -s "Test" performance@evzain.com
```

---

## Timeline

- **Resend Inbound**: 10 minutes total
- **Namecheap Forwarding**: 20 minutes total
- **DNS Propagation**: 5-15 minutes
- **Total Time**: 15-30 minutes

---

## Need Help?

If stuck:
1. Screenshot the Namecheap DNS records page
2. Screenshot the Resend Inbound page
3. Run `dig MX evzain.com +short` and share output
4. Check Resend logs for any errors

**You're close! Just need MX records configured. Choose Resend Inbound for fastest setup.**
