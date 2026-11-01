'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatIst } from '@/lib/instagram/time';
import { deliveryKind, type IgPost, type MediaItem } from '@/lib/instagram/types';
import { normalizeContentType } from '@/lib/instagram/validate';

type Health = { username: string; usage: number; total: number; durationSeconds: number };

const STATUS: Record<IgPost['status'], string> = {
  draft: 'Draft',
  approved: 'Approved',
  scheduled: 'Scheduled',
  publishing: 'Publishing',
  published: 'Published',
  failed: 'Failed',
};

const REASONS: Record<string, string> = {
  invalid: 'Use a JPEG or PNG, or an MP4. A single video becomes a Reel. Two to ten files become a carousel. The caption can be 2,200 characters.',
  not_found: 'That post is no longer here.',
  not_editable: 'That post can no longer be edited.',
  not_approvable: 'That post can no longer be approved.',
  schedule_in_past: 'Choose a time in the future, India time. To post immediately, use Post to Instagram now.',
  not_configured: 'Instagram credentials are not configured on the server.',
  store_unconfigured: 'The post store is not configured.',
  conflict: 'That post changed while you were editing. Refresh and try again.',
  upload_failed: 'The upload did not finish.',
  media_store_unconfigured: 'The public media store is not connected. Add IG_BLOB_READ_WRITE_TOKEN for a public Blob store.',
  unauthorized: 'Sign in again.',
};

export function InstagramDesk({ initialPosts, dryRun, health, healthError, storeError }: {
  initialPosts: IgPost[];
  dryRun: boolean;
  health: Health | null;
  healthError: string | null;
  storeError: string | null;
}) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [scheduledAt, setScheduledAt] = useState('');
  const [progress, setProgress] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [warn, setWarn] = useState('');
  const [busy, setBusy] = useState(false);
  const [connection, setConnection] = useState(health);
  const [connectionError, setConnectionError] = useState(healthError);
  const kind = deliveryKind(media);

  function load(post: IgPost) {
    setEditingId(post.id);
    setCaption(post.caption);
    setMedia(post.media);
    setScheduledAt('');
    setWarn('');
    setMessage(`Editing the ${STATUS[post.status].toLowerCase()} post.`);
  }

  function reset(nextMessage = '') {
    setEditingId(null);
    setCaption('');
    setMedia([]);
    setScheduledAt('');
    setMessage(nextMessage);
    setWarn('');
  }

  async function uploadFiles(list: FileList | null) {
    if (!list?.length) return;
    setBusy(true);
    setWarn('');
    const next = [...media];
    try {
      for (const file of Array.from(list)) {
        if (next.length >= 10) throw new Error('A post can hold 10 files.');
        const contentType = normalizeContentType(file.type);
        if (!contentType) throw new Error(`${file.name} is not a JPEG, PNG, or MP4.`);
        if (file.size > 250 * 1024 * 1024) throw new Error(`${file.name} is larger than 250 MB.`);
        setProgress(`Uploading ${file.name}…`);
        const { upload } = await import('@vercel/blob/client');
        const safe = file.name.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^\.+/, '').slice(0, 80) || 'media';
        const blob = await upload(`bybo-instagram/media/${crypto.randomUUID()}-${safe}`, file, {
          access: 'public',
          handleUploadUrl: '/api/admin/instagram/upload',
          contentType,
          multipart: file.size > 4_500_000,
          onUploadProgress: ({ percentage }) => setProgress(`Uploading ${file.name}… ${Math.round(percentage)}%`),
        });
        next.push({
          url: blob.url,
          pathname: blob.pathname,
          contentType,
          kind: contentType === 'video/mp4' ? 'video' : 'image',
        });
        setMedia([...next]);
      }
    } catch (err) {
      const text = err instanceof Error ? err.message : '';
      if (text.includes('JPEG') || text.includes('250 MB') || text.includes('10 files')) setWarn(text);
      else setWarn(REASONS.upload_failed);
    } finally {
      setProgress(null);
      setBusy(false);
    }
  }

  async function send(action: 'save' | 'publish' | 'schedule') {
    setBusy(true);
    setWarn('');
    setMessage('');
    try {
      const res = await fetch('/api/admin/instagram', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action, id: editingId ?? undefined, caption, media, scheduledAt }),
      });
      const data = await res.json() as { ok?: boolean; reason?: string; error?: string | null; post?: IgPost; pending?: boolean };
      if (data.post) upsert(data.post);
      if (!res.ok || data.ok === false) {
        setWarn(data.error || REASONS[data.reason ?? ''] || 'That did not work.');
        return;
      }
      if (data.pending) {
        setMessage('Instagram is still processing the media. You can leave this page. The scheduler will finish this same post, and it will not publish it twice.');
      } else if (data.post?.dryRun) {
        reset('Recorded. Dry run is on, so Instagram was not called.');
      } else if (data.post?.status === 'published') {
        reset('Posted to Instagram.');
      } else if (data.post?.status === 'scheduled') {
        reset(`Scheduled for ${data.post.scheduledAt ? formatIst(data.post.scheduledAt) : 'later'}. It will not go out before then.`);
      } else if (data.post?.status === 'draft') {
        setEditingId(data.post.id);
        setMessage('Draft saved. It will not be posted until you approve it.');
      }
    } catch {
      setWarn('The desk could not be reached.');
    } finally {
      setBusy(false);
    }
  }

  function upsert(post: IgPost) {
    setPosts((current) => {
      const rest = current.filter((item) => item.id !== post.id);
      return [post, ...rest].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    });
  }

  async function remove(id: string) {
    setBusy(true);
    setWarn('');
    try {
      const res = await fetch('/api/admin/instagram', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ action: 'delete', id }),
      });
      const data = await res.json() as { ok?: boolean; reason?: string };
      if (!res.ok || data.ok === false) {
        setWarn(REASONS[data.reason ?? ''] || 'That draft could not be deleted.');
        return;
      }
      setPosts((current) => current.filter((item) => item.id !== id));
      if (editingId === id) reset();
    } catch {
      setWarn('The desk could not be reached.');
    } finally {
      setBusy(false);
    }
  }

  async function refreshHealth() {
    const res = await fetch('/api/admin/instagram/health');
    const data = await res.json() as Health & { ok?: boolean; error?: string; reason?: string };
    if (data.ok && data.username) {
      setConnection({ username: data.username, usage: data.usage, total: data.total, durationSeconds: data.durationSeconds });
      setConnectionError(null);
      return;
    }
    setConnectionError(data.error || REASONS[data.reason ?? ''] || 'Instagram could not be reached.');
  }

  async function logout() {
    await fetch('/api/admin/instagram/session', { method: 'DELETE' });
    router.refresh();
  }

  return (
    <div className="ig-wrap">
      <header className="ig-top">
        <div>
          <p className="ig-kicker">BYBO · @byboindia</p>
          <h1>Instagram desk</h1>
        </div>
        <button className="ig-ghost" type="button" onClick={logout}>Log out</button>
      </header>

      {dryRun ? (
        <p className="ig-banner" role="status">Dry run is on. Post and Schedule record the approval here and do not create anything on Instagram. Set IG_POST_DRY_RUN to false when a real post should go out.</p>
      ) : (
        <p className="ig-banner ig-live" role="status">Live posting is on. Post and Schedule send the approved post to @byboindia.</p>
      )}

      <section className="ig-card" aria-labelledby="ig-compose">
        <div className="ig-row">
          <h2 id="ig-compose">New post</h2>
          {editingId ? <button className="ig-ghost" type="button" onClick={() => reset()}>Start a new one</button> : null}
        </div>
        <p className="ig-note">A saved draft stays here. Nothing reaches Instagram until you press Post to Instagram now or Schedule.</p>
        {storeError ? <p className="ig-warn" role="alert">{storeError}</p> : null}
        <p className="ig-health">
          {connection ? (
            <>Connected as @{connection.username}. {connection.usage} of {connection.total} posts used in the current {Math.round(connection.durationSeconds / 3600)} hour window.</>
          ) : (
            connectionError
          )}
          <button className="ig-text" type="button" onClick={refreshHealth}>Check connection</button>
        </p>

        <label className="ig-file">
          Add JPEG, PNG, or MP4
          <input
            type="file"
            accept="image/jpeg,image/png,video/mp4"
            multiple
            onChange={(event) => {
              void uploadFiles(event.target.files);
              event.target.value = '';
            }}
            disabled={busy || media.length >= 10}
          />
        </label>
        {progress ? <p role="status">{progress}</p> : null}
        {kind ? <p className="ig-kind">{kind === 'carousel' ? `Carousel, ${media.length} files, in this order` : kind === 'reel' ? 'Single Reel' : 'Single image'}</p> : null}

        <ul className="ig-preview">
          {media.map((item, index) => (
            <li key={item.url}>
              {item.kind === 'video' ? (
                <video src={item.url} controls playsInline preload="metadata" />
              ) : (
                // Blob previews are one-off founder uploads, not site images.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url} alt={`Preview ${index + 1}`} />
              )}
              <span>File {index + 1}</span>
              <button className="ig-text" type="button" onClick={() => setMedia(media.filter((entry) => entry.url !== item.url))}>Remove</button>
            </li>
          ))}
        </ul>

        <label>
          Caption
          <textarea value={caption} onChange={(event) => setCaption(event.target.value)} maxLength={2200} rows={6} placeholder="Write the caption" />
        </label>
        <p className="ig-count">{caption.trim().length} / 2,200</p>

        <label>
          Schedule for (India time, IST)
          <input type="datetime-local" value={scheduledAt} onChange={(event) => setScheduledAt(event.target.value)} />
        </label>

        {warn ? <p className="ig-warn" role="alert">{warn}</p> : null}
        {message ? <p className="ig-ok" role="status">{message}</p> : null}

        <div className="ig-actions">
          <button className="ig-ghost" type="button" disabled={busy || media.length === 0} onClick={() => void send('save')}>Save draft</button>
          <button className="ig-primary" type="button" disabled={busy || media.length === 0} onClick={() => void send('publish')}>Post to Instagram now</button>
          <button className="ig-primary" type="button" disabled={busy || media.length === 0 || !scheduledAt} onClick={() => void send('schedule')}>Schedule</button>
        </div>
      </section>

      <section className="ig-card" aria-labelledby="ig-list">
        <h2 id="ig-list">Posts</h2>
        {posts.length === 0 ? <p>No posts yet.</p> : null}
        <ul className="ig-list">
          {posts.map((post) => {
            const postKind = deliveryKind(post.media);
            const editable = post.status === 'draft' || post.status === 'failed' || post.status === 'scheduled' || post.status === 'approved';
            return (
              <li key={post.id}>
                <div className="ig-row">
                  <strong>{STATUS[post.status]}</strong>
                  <span>{postKind === 'carousel' ? `Carousel · ${post.media.length}` : postKind === 'reel' ? 'Reel' : 'Image'}</span>
                  {post.dryRun && post.status === 'published' ? <span>Dry run</span> : null}
                </div>
                <p>{post.caption || 'No caption'}</p>
                {post.scheduledAt ? <p>Goes out {formatIst(post.scheduledAt)}. The scheduler runs every 10 minutes.</p> : null}
                {post.permalink ? <p><a href={post.permalink} rel="noreferrer">View on Instagram</a></p> : null}
                {post.error ? <p className="ig-warn">{post.error}</p> : null}
                <div className="ig-actions">
                  {editable ? <button className="ig-ghost" type="button" onClick={() => load(post)}>Edit</button> : null}
                  {post.status === 'draft' ? <button className="ig-text" type="button" onClick={() => void remove(post.id)}>Delete draft</button> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
