export function getDefaultDocumentPath(user) {
  if (!user?.id) {
    return "/login";
  }

  return `/docs/${user.id}-default-document`;
}
