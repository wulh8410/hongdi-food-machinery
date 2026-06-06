const githubPagesBasePath = '/hongdi-food-machinery';

export function assetPath(path: string) {
  if (!path.startsWith('/')) return path;
  if (path.startsWith(githubPagesBasePath)) return path;
  return process.env.GITHUB_PAGES === 'true' ? `${githubPagesBasePath}${path}` : path;
}
