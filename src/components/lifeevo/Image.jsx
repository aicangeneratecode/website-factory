export default function Image({ fill, priority, style, ...props }) {
  return <img {...props}
    loading={priority ? 'eager' : 'lazy'}
    style={fill ? { position: 'absolute', inset: 0, width: '100%', height: '100%', ...style } : style}
  />;
}
