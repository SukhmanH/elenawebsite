# Button Backups

## src/components/layout/nav.tsx

```tsx
<Link
  href="#newsletter"
  onClick={() => setOpen(false)}
  className="inline-flex rounded-full bg-gold px-9 py-4 text-sm font-medium tracking-wide text-char transition-colors hover:bg-gold-deep"
>
  Join the mailing list
</Link>
```

## src/components/layout/footer.tsx

```tsx
<Link
  href="#newsletter"
  className="mt-10 inline-flex rounded-full bg-gold px-10 py-4 text-sm font-medium tracking-wide text-char transition-colors hover:bg-gold-deep"
>
  Join the mailing list
</Link>
```

## src/components/home/mailing-list.tsx

```tsx
<button
  type="submit"
  disabled={loading}
  className="shrink-0 rounded-full bg-gold px-8 py-4 text-sm font-medium tracking-wide text-char transition-colors hover:bg-gold-deep disabled:opacity-50"
>
  {loading ? 'Joining...' : 'Join the mailing list'}
</button>
```
