# bybo.in

## Instagram posting (@byboindia)

The founder posts to Instagram from `/admin/instagram`. A draft is never sent. **Post to Instagram now** and **Schedule** are the approval. The scheduler at `/api/cron/instagram` runs every 10 minutes and publishes each due approved post once.

Sign in with the existing `CRON_SECRET`. The same bearer token used by the other admin routes (`Authorization: Bearer $CRON_SECRET`) also works on the JSON API.

### What you can post

- One JPEG or PNG, with a caption.
- One MP4, published as a Reel (and shared to the feed).
- A carousel of 2–10 images and/or MP4s, in the order you add them.

Files upload from the browser straight to a **public** Vercel Blob store, because Instagram has to fetch a public HTTPS URL and a Reel is often larger than the 4.5 MB serverless body limit. Post records (captions, status, the permalink) stay as private JSON on the existing `bybo-leads` store.

Scheduled times are India time (Asia/Kolkata). The cron can run up to 10 minutes after the time you pick.

### Dry run

`IG_POST_DRY_RUN` defaults to on. Leave it unset, or set any value other than `false`, and an approval is stored and logged without calling Instagram. Set it to `false` only when a real post should go out. A dry-run record is not posted later when you turn dry run off; approve a new post.

Check the token without posting: `GET /api/admin/instagram/health` (admin auth). It reads the account username and `content_publishing_limit`. The publisher stops when that quota is used. This account's quota is 100 posts per 24 hours.

### Environment

Already set in production: `IG_ACCESS_TOKEN`, `IG_USER_ID`, `FB_PAGE_ID`, `CRON_SECRET`, `BLOB_READ_WRITE_TOKEN`.

Add:

| Variable | Purpose |
| --- | --- |
| `IG_BLOB_READ_WRITE_TOKEN` | Read-write token for a **public** Blob store. `bybo-leads` is private, so Instagram cannot fetch those files. Connect the public store with env prefix `IG` so this name does not replace `BLOB_READ_WRITE_TOKEN`. |
| `IG_POST_DRY_RUN` | Optional. `false` publishes for real. Unset means dry run. |

```bash
vercel blob create-store bybo-instagram --access public --region bom1
```

Connect that store to the `bybo` project in production and preview with the environment-variable prefix `IG`.

The access token is sent to Graph API as a bearer header. It is not written into URLs, logs, or API responses.
