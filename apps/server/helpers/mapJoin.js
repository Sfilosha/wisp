export function mapJoin(items, callback) {
    return items.map(callback).join('\n');
  }