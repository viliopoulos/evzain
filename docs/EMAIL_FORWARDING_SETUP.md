# Email Forwarding Setup: performance@evzain.com → viliopoulo@gmail.com

## Option 1: Namecheap Email Forwarding (Recommended - Free)

1. **Log in to Namecheap** → Domain List → `evzain.com` → **Manage**
2. **Advanced DNS** → scroll to **Mail Settings** section
3. Click **Add Forwarder** (or **Email Forwarding** if using legacy UI)
4. Configure:
   - **Alias**: `performance`
   - **Forward To**: `viliopoulo@gmail.com`
5. **Save** and wait 5-15 minutes for propagation
6. **Test**: Send an email to `performance@evzain.com` from another account

## Option 2: Resend Inbound Routing (If Namecheap doesn't support forwarding)

1. In Resend dashboard → **Domains** → `evzain.com` → **Inbound**
2. Add MX records to Namecheap DNS (Resend will provide them)
3. Create forwarding rule: `performance@evzain.com` → `viliopoulo@gmail.com`

## Option 3: Gmail Alias (Alternative)

If you want replies to `performance@evzain.com` to come from Gmail:

1. Gmail → Settings → **Accounts and Import**
2. **Send mail as** → Add another email address
3. Enter: `EVZAIN <performance@evzain.com>`
4. Use Resend SMTP credentials for sending (optional, or just use for receiving)

## Verification

After setup, test by:
1. Sending an email to `performance@evzain.com` from a personal account
2. Confirming it arrives at `viliopoulo@gmail.com`
3. Replying from Gmail (if using Option 3, it will show as from `performance@evzain.com`)

---

**Current Status**: Resend sending works. Forwarding needs DNS configuration at Namecheap.
